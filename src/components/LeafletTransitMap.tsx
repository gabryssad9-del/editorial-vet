// @ts-nocheck
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { MapPin, Navigation, Footprints, Clock, X, Loader2, Car, Plus, Minus, Search, Trash2, ChevronRight, RotateCcw } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// ── Historia wyszukiwań (localStorage, per-przeglądarka) ──────────────────────
const HISTORY_KEY = 'vetmed_map_history_v2';

interface HistoryEntry { id: string; from: string; timestamp: number; }

function loadHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}
function pushHistory(from: string) {
  if (!from.trim()) return;
  const h = loadHistory().filter(e => e.from !== from.trim());
  const updated = [{ id: `${Date.now()}`, from: from.trim(), timestamp: Date.now() }, ...h].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}
function clearHistory() { localStorage.removeItem(HISTORY_KEY); }
function deleteEntry(id: string) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(loadHistory().filter(e => e.id !== id)));
}
function relativeTime(ts: number): string {
  const d = Date.now() - ts, m = Math.floor(d / 60000), h = Math.floor(d / 3600000);
  if (m < 1) return 'przed chwilą';
  if (m < 60) return `${m} min temu`;
  if (h < 24) return `${h} godz. temu`;
  return `${Math.floor(d / 86400000)} dni temu`;
}

const CLINIC_LOCATION: [number, number] = [53.776946, 20.505939]; // ul. Pana Tadeusza 6, Olsztyn



type TravelMode = 'car' | 'foot';

const MapController = ({ bounds }: { bounds: L.LatLngBounds | null }) => {
  const map = useMap();
  useEffect(() => {
    if (!bounds || !bounds.isValid()) return;
    try {
      const center = bounds.getCenter();
      if (isNaN(center.lat) || isNaN(center.lng)) return;
      
      const size = map.getSize();
      if (size.x < 10 || size.y < 10) {
        map.invalidateSize();
      } else {
        map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5, easeLinearity: 0.1 });
      }
    } catch (e) {
      console.warn('Map bounds error:', e);
    }
  }, [bounds, map]);
  return null;
};

// Customowe przyciski Zoom
const CustomZoomControls = () => {
  const map = useMap();
  return (
    <div className="absolute bottom-10 right-10 z-[2020] flex flex-col gap-3">
      <button 
        onClick={() => map.zoomIn()}
        className="w-14 h-14 bg-accent text-white rounded-2xl shadow-[0_20px_50px_rgba(254,69,32,0.4)] flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all duration-500 group"
      >
        <Plus size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>
      <button 
        onClick={() => map.zoomOut()}
        className="w-14 h-14 bg-accent text-white rounded-2xl shadow-[0_20px_50px_rgba(254,69,32,0.4)] flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all duration-500 group"
      >
        <Minus size={24} strokeWidth={3} className="group-hover:scale-125 transition-transform duration-500" />
      </button>
    </div>
  );
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    // Nasłuchiwanie na zmiany rozmiaru kontenera
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(map.getContainer());
    
    // Wymuszenie przeliczenia po załadowaniu (wielokrotne dla pewności w Next.js)
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 500);
    const t3 = setTimeout(() => map.invalidateSize(), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [map]);
  return null;
};

const LeafletTransitMap = () => {
  const [selectedStop, setSelectedStop] = useState<any | null>(null);
  const [activePathSegments, setActivePathSegments] = useState<Array<{ path: number[][], type: 'walk' | 'car' }>>([]);
  const [routeSteps, setRouteSteps] = useState<Array<{ type: 'walk' | 'car', duration: number, label: string }>>([]);
  const [routeDuration, setRouteDuration] = useState<number | null>(null);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [mode, setMode] = useState<TravelMode>('car');
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUserStartingPoint, setIsUserStartingPoint] = useState(false);

  // ── Panel wyszukiwania Jakdojade ──────────────────────────────────────────
  const [fromAddress, setFromAddress] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');
  const [searchHistory, setSearchHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isWalkFaster, setIsWalkFaster] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const searchX = useMotionValue(0);
  const searchY = useMotionValue(0);
  const resultsX = useMotionValue(0);
  const resultsY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
    setSearchHistory(loadHistory());
    
    // Przywróć pozycje paneli
    const searchSaved = localStorage.getItem('vet_search_pos_v2');
    if (searchSaved) {
      const pos = JSON.parse(searchSaved);
      searchX.set(pos.x);
      searchY.set(pos.y);
    }
    const resultsSaved = localStorage.getItem('vet_results_pos_v2');
    if (resultsSaved) {
      const pos = JSON.parse(resultsSaved);
      resultsX.set(pos.x);
      resultsY.set(pos.y);
    }

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                    getComputedStyle(document.body).backgroundColor === 'rgb(10, 10, 10)';
      setIsDarkMode(isDark);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Zamknij dropdown historii po kliknięciu poza panelem
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => { observer.disconnect(); document.removeEventListener('mousedown', handleOutsideClick); };
  }, []);

  // Geocoding przez Nominatim (OpenStreetMap) – bezpłatne API
  const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const q = encodeURIComponent(`${address}, Olsztyn, Polska`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=pl`, {
        headers: { 'Accept-Language': 'pl', 'User-Agent': 'VetMed-Olsztyn/1.0' }
      });
      const data = await res.json();
      if (data?.[0]) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      // Próba bez nazwy miasta
      const q2 = encodeURIComponent(address);
      const res2 = await fetch(`https://nominatim.openstreetmap.org/search?q=${q2}&format=json&limit=1&countrycodes=pl`, {
        headers: { 'Accept-Language': 'pl', 'User-Agent': 'VetMed-Olsztyn/1.0' }
      });
      const data2 = await res2.json();
      if (data2?.[0]) return [parseFloat(data2[0].lat), parseFloat(data2[0].lon)];
      return null;
    } catch { return null; }
  };

  // Wyszukaj trasę z wpisanego adresu
  const handleAddressSearch = async (addr?: string) => {
    const query = (addr ?? fromAddress).trim();
    if (!query) return;
    setGeocodeError('');
    setIsGeocoding(true);
    setShowHistory(false);

    const coords = await geocodeAddress(query);
    setIsGeocoding(false);

    if (!coords) {
      setGeocodeError('Nie znaleziono adresu. Spróbuj dokładniej.');
      return;
    }

    pushHistory(query);
    setSearchHistory(loadHistory());
    setUserLocation(coords);
    setIsUserStartingPoint(true);

    if (coords) {
      const targetPoint = { id: '_search', name: query, pos: coords };
      setSelectedStop(targetPoint);
      calculateRoute(targetPoint, mode, true, coords);
    }
  };

  const modeConfig = {
    car: { label: 'Samochód', icon: Car, color: '#3b82f6', bg: 'bg-blue-500' },
    foot: { label: 'Pieszo', icon: Footprints, color: '#22c55e', bg: 'bg-green-500' }
  };


  // Haversine: zwraca dystans w metrach
  const haversine = (a: [number, number], b: [number, number]): number => {
    const R = 6371e3;
    const f1 = a[0] * Math.PI / 180, f2 = b[0] * Math.PI / 180;
    const df = (b[0] - a[0]) * Math.PI / 180, dl = (b[1] - a[1]) * Math.PI / 180;
    const x = Math.sin(df/2)**2 + Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  };

  // Czas spaceru w minutach przy 5km/h
  const walkMin = (a: [number, number], b: [number, number]): number =>
    Math.ceil((haversine(a, b) / 1000) / 5 * 60);

  const fetchRoute = async (start: [number, number], end: [number, number], profile: string = 'driving', forceWalking: boolean = false) => {
    const osrmProfile = profile === 'walking' ? 'foot' : profile;
    try {
      const res = await fetch(`https://router.project-osrm.org/route/v1/${osrmProfile}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
      const data = await res.json();
      if (!data.routes?.[0]) return { path: [start, end], duration: 0 };
      const coords = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]] as [number, number]);
      // Zawsze liczymy realny czas chodzenia z Haversine po punktach trasy
      let duration: number;
      if (forceWalking || profile === 'walking') {
        let dist = 0;
        for (let i = 0; i < coords.length - 1; i++) dist += haversine(coords[i], coords[i+1]);
        duration = (dist / 1000) / 5 * 3600; // 5 km/h → sekundy
      } else {
        duration = data.routes[0].duration * 1.25; // bufor dla auta
      }
      return { path: coords, duration };
    } catch (e) { return { path: [start, end], duration: 0 }; }
  };



  const calculateRoute = async (
    stop: any,
    currentMode: TravelMode,
    fromUser: boolean = false,
    userPos?: [number, number]
  ) => {
    setIsRouteLoading(true);
    setActivePathSegments([]);
    setRouteSteps([]);
    setRouteDuration(null);

    const origin: [number, number] | null = userPos || userLocation;
    const segs: Array<{ path: number[][], type: 'walk' | 'car' }> = [];
    const steps: Array<{ type: 'walk' | 'car', duration: number, label: string }> = [];
    let total = 0;

    try {
      if (currentMode === 'foot') {
        const start: [number, number] = (fromUser && origin) ? origin : stop.pos as [number, number];
        const leg = await fetchRoute(start, CLINIC_LOCATION, 'walking', true);
        const d = Math.ceil(leg.duration / 60);
        segs.push({ path: leg.path, type: 'walk' });
        steps.push({ type: 'walk', duration: d, label: 'Spacer do kliniki' });
        total = d;
      } else {
        const start: [number, number] = (fromUser && origin) ? origin : stop.pos as [number, number];
        const leg = await fetchRoute(start, CLINIC_LOCATION, 'driving', false);
        const d = Math.ceil(leg.duration / 60);
        segs.push({ path: leg.path, type: 'car' });
        steps.push({ type: 'car', duration: d, label: 'Dojazd samochodem' });
        total = d;
      }
    } catch (e) {
      console.error('Route error', e);
    }

    setActivePathSegments(segs);
    setRouteSteps(steps);
    setRouteDuration(total || null);
    setIsRouteLoading(false);
    const allCoords = segs.flatMap(s => s.path);
    const validCoords = allCoords.filter(c => c && typeof c[0] === 'number' && !isNaN(c[0]) && typeof c[1] === 'number' && !isNaN(c[1]));
    if (validCoords.length > 1) setMapBounds(L.latLngBounds(validCoords as any));
  };

  const handleStopClick = (stop: any) => {
    setSelectedStop(stop);
    calculateRoute(stop, mode, isUserStartingPoint, userLocation ?? undefined);
  };

  const handleClinicClick = () => {
    setSelectedStop(null);
    setActivePathSegments([]);
    setRouteSteps([]);
    setMapBounds(null);
  };

  // Przelicz trasę gdy zmienia się tryb (tylko jeśli jest wybrany przystanek)
  useEffect(() => {
    if (!isMounted || !selectedStop) return;
    calculateRoute(selectedStop, mode, isUserStartingPoint, userLocation ?? undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isMounted]);

  const getUserLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert('Twoja przeglądarka nie wspiera geolokalizacji.');
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos: [number, number] = [coords.latitude, coords.longitude];
        setUserLocation(pos);
        setIsUserStartingPoint(true);
        setIsLocating(false);

        const targetPoint = { id: '_user', name: 'Twoja lokalizacja', pos: pos };
        setSelectedStop(targetPoint);
        calculateRoute(targetPoint, mode, true, pos);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    const handleTrigger = () => getUserLocation();
    window.addEventListener('trigger-locate', handleTrigger);
    return () => window.removeEventListener('trigger-locate', handleTrigger);
  });

  const Icons = useMemo(() => {
    if (typeof window === 'undefined') return {};
    return {
      Clinic: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pulse-container">
                <div class="pulse-ring"></div>
                <div class="clinic-core" style="border-color: ${isDarkMode ? '#0a0a0a' : '#fff'}">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div style="position: absolute; top: -45px; left: 50%; transform: translateX(-50%); white-space: nowrap; padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: 900; background: #FE4520; color: white; box-shadow: 0 10px 25px rgba(254,69,32,0.4); pointer-events: none;">KLINIKA VETMED</div>
               </div>`,
        iconSize: [80, 80], iconAnchor: [40, 40]
      }),
      User: L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="user-location-premium">
                <div class="user-aura"></div>
                <div class="user-glass-core"></div>
                <div class="user-dot"></div>
               </div>`,
        iconSize: [60, 60], iconAnchor: [30, 30]
      })
    };
  }, [isDarkMode]);



  const constraintsRef = useRef(null);

  if (!isMounted) return <div className="w-full h-full min-h-[600px] flex items-center justify-center font-black text-accent uppercase">Inicjalizacja...</div>;

  // ── Shared map content ───────────────────────────────────────────────────
  const mapContent = (
    <>
      <MapResizer />
      <TileLayer 
        key={isDarkMode ? 'dark' : 'light'}
        url={isDarkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"} 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapController bounds={mapBounds} />
      <CustomZoomControls />
      {userLocation && <Marker position={userLocation} icon={Icons.User!} />}
      {activePathSegments.map((segment, i) => (
        <React.Fragment key={i}>
          {segment.type === 'car' && (
            <Polyline positions={segment.path as any} pathOptions={{ color: '#FE4520', weight: 10, opacity: 0.2, lineCap: 'round' }} className="route-glow" />
          )}
          <Polyline positions={segment.path as any} pathOptions={{ color: segment.type === 'walk' ? (isDarkMode ? '#ffffff' : '#000000') : '#FE4520', weight: segment.type === 'walk' ? 3 : 5, opacity: segment.type === 'walk' ? 0.5 : 0.9, dashArray: segment.type === 'walk' ? '8, 12' : undefined, lineCap: 'round' }} />
        </React.Fragment>
      ))}
      <Marker position={CLINIC_LOCATION} icon={Icons.Clinic!} eventHandlers={{ click: handleClinicClick }} />
    </>
  );

  // ── Shared search form fields ─────────────────────────────────────────────
  const searchFormFields = (isMobile = false) => (
    <div className={`flex flex-col gap-2 relative ${isMobile ? '' : 'p-4'}`}>
      <div className="relative">
        <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-200 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} ${showHistory ? 'border-accent/60 shadow-[0_0_0_3px_rgba(254,69,32,0.1)]' : ''}`}>
          <Navigation size={14} className="text-accent shrink-0" />
          <input
            type="text"
            placeholder="Skąd jedziemy?"
            value={fromAddress}
            onChange={e => { setFromAddress(e.target.value); setGeocodeError(''); }}
            onFocus={() => setShowHistory(true)}
            onKeyDown={e => e.key === 'Enter' && handleAddressSearch()}
            className={`flex-1 bg-transparent outline-none text-sm font-semibold placeholder:text-current/30 min-w-0 ${isDarkMode ? 'text-white' : 'text-black'}`}
          />
          {fromAddress && (
            <button onClick={() => { setFromAddress(''); setGeocodeError(''); }} className="text-current/30 hover:text-accent transition-colors shrink-0">
              <RotateCcw size={12} />
            </button>
          )}
        </div>
        <AnimatePresence>
          {showHistory && searchHistory.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#1a1a1a]/98 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-1.5"><Clock size={9} /> Historia</span>
                <button onClick={() => { clearHistory(); setSearchHistory([]); }} className="text-[9px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-400 transition-colors flex items-center gap-1"><Trash2 size={9} /> Wyczyść</button>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {searchHistory.filter(h => !fromAddress || h.from.toLowerCase().includes(fromAddress.toLowerCase())).map(entry => (
                  <div key={entry.id} onClick={() => { setFromAddress(entry.from); setShowHistory(false); handleAddressSearch(entry.from); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 cursor-pointer group transition-colors">
                    <Clock size={11} className="text-white/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white/80 truncate">{entry.from}</p>
                      <p className="text-[9px] text-white/25 font-medium">{relativeTime(entry.timestamp)}</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); deleteEntry(entry.id); setSearchHistory(loadHistory()); }} className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all"><X size={11} /></button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${isDarkMode ? 'bg-white/3 border-white/5' : 'bg-black/3 border-black/5'}`}>
        <MapPin size={14} className="text-current/30 shrink-0" />
        <span className={`text-xs font-semibold truncate ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>Klinika VetMed – ul. Pana Tadeusza 6</span>
      </div>

      {geocodeError && <p className="text-[10px] font-bold text-red-400 px-1">{geocodeError}</p>}

      <div className="flex gap-2 mt-1">
        <button onClick={() => handleAddressSearch()} disabled={!fromAddress.trim() || isGeocoding}
          className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[0_8px_25px_rgba(254,69,32,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
          {isGeocoding ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
          {isGeocoding ? 'Szukam...' : 'Pokaż trasę'}
        </button>
        <button onClick={getUserLocation} title="Użyj GPS"
          className={`flex items-center justify-center w-11 rounded-xl border transition-all ${isUserStartingPoint ? 'bg-accent/20 border-accent/40 text-accent' : (isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white' : 'bg-black/5 border-black/10 text-black/40 hover:border-black/30 hover:text-black')}`}>
          {isLocating ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
        </button>
      </div>

      <button
        onClick={() => getUserLocation()}
        className={`w-full flex items-center justify-center gap-3 py-4 mt-1 rounded-xl border-2 font-black text-[9px] tracking-[0.3em] uppercase transition-all duration-500 group/nav ${isDarkMode ? 'border-white/5 bg-white/5 text-white hover:bg-white hover:text-black' : 'border-black/5 bg-black/5 text-black hover:bg-black hover:text-white'}`}
      >
        <Navigation size={12} className="group-hover/nav:translate-x-1 group-hover/nav:-translate-y-1 transition-transform" />
        Nawiguj teraz
      </button>

      <div className={`flex p-1 rounded-xl gap-1 mt-1 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
        {(['car', 'foot'] as TravelMode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all font-black text-[9px] uppercase tracking-wider ${mode === m ? 'bg-accent text-white' : (isDarkMode ? 'text-white/30 hover:text-white/60' : 'text-black/30 hover:text-black/60')}`}>
            {React.createElement(modeConfig[m].icon, { size: 12, strokeWidth: 3 })}
            <span>{modeConfig[m].label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Shared route results ──────────────────────────────────────────────────
  const routeResults = (isMobile = false) => selectedStop && (
    <div className={`flex flex-col gap-4 ${isMobile ? '' : 'gap-8'}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] text-accent font-black uppercase tracking-widest">Planer Podróży</span>
          <h2 className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {isUserStartingPoint ? 'Z Twojej Lokalizacji' : selectedStop.name}
          </h2>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setSelectedStop(null); setActivePathSegments([]); setRouteSteps([]); setIsUserStartingPoint(false); setFromAddress(''); setGeocodeError(''); }}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/15 text-black'}`}>
          <X size={18} strokeWidth={3} />
        </button>
      </div>

      <div className={`flex p-1 rounded-xl gap-1 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
        {(['car', 'foot'] as TravelMode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all font-black text-[9px] uppercase tracking-wider ${mode === m ? 'bg-accent text-white shadow-md' : (isDarkMode ? 'text-white/30 hover:text-white/60' : 'text-black/30 hover:text-black/60')}`}>
            {React.createElement(modeConfig[m].icon, { size: 12, strokeWidth: 3 })}
            <span>{modeConfig[m].label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black tracking-tighter">
          {isRouteLoading ? <Loader2 className="animate-spin inline-block" size={32} /> : routeDuration ? `~${routeDuration}` : '—'}
        </span>
        <span className="text-lg font-bold opacity-40 uppercase">min</span>
      </div>

      <div className="flex flex-col gap-0">
        {routeSteps.map((step, idx) => (
          <div key={idx} className="relative flex gap-4 pb-6 last:pb-0">
            {idx !== routeSteps.length - 1 && (
              <div className={`absolute left-[14px] top-[28px] bottom-0 w-0.5 ${step.type === 'walk' ? 'border-l-2 border-dashed border-white/20' : 'bg-accent'}`} />
            )}
            <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${step.type === 'walk' ? 'bg-white/10' : 'bg-accent shadow-[0_0_15px_rgba(254,69,32,0.4)]'}`}>
              {step.type === 'walk' ? <Footprints size={12} className="text-white/60" /> : <Car size={12} className="text-white" />}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{step.duration} MIN</span>
              <p className="text-sm font-bold tracking-tight">{step.label}</p>
            </div>
          </div>
        ))}
      </div>

      <a href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation ? userLocation.join(',') : (selectedStop.pos ? selectedStop.pos.join(',') : '')}&destination=${CLINIC_LOCATION.join(',')}`}
        target="_blank"
        className="w-full py-4 bg-accent text-white rounded-2xl font-black text-[10px] tracking-[0.4em] flex items-center justify-center shadow-[0_10px_30px_rgba(254,69,32,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all">
        START LIVE GPS
      </a>
    </div>
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT (< lg) — czysty stack: mapa → formularz → wyniki
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full flex flex-col">
        {/* Mapa — skompaktowana, bez żadnych nakładek */}
        <div className={`relative w-full h-[320px] overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
          <MapContainer center={CLINIC_LOCATION} zoom={14} zoomControl={false} scrollWheelZoom={false} dragging={true} zoomSnap={1} zoomDelta={1} className="w-full h-full z-0">
            {mapContent}
          </MapContainer>
        </div>

        {/* Panel wyszukiwania */}
        <div className={`w-full px-4 py-5 border-b ${isDarkMode ? 'bg-[#0f0f0f] border-white/5 text-white' : 'bg-white border-black/5 text-black'}`}>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-1">Zaplanuj trasę</p>
          <h3 className={`text-lg font-black tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Jak dojechać?</h3>
          {searchFormFields(true)}
        </div>

        {/* Wyniki trasy (jeśli aktywne) */}
        {selectedStop && (
          <div className={`w-full px-4 py-5 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-gray-50 text-black'}`}>
            {routeResults(true)}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT (≥ lg) — pływające panele na mapie
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="hidden lg:block relative w-full py-24 px-10 overflow-visible">
        <div className="relative w-full max-w-[1600px] mx-auto h-[750px] group">
          {/* Drag Area - powiększony obszar pozwalający panelom w całości wyjść poza mapę */}
          <div ref={constraintsRef} className="absolute inset-y-[-200px] inset-x-[-500px] pointer-events-none z-[2005]" />

          <div className={`absolute inset-0 translate-y-4 translate-x-1 rounded-[3.5rem] opacity-30 ${isDarkMode ? 'bg-black' : 'bg-gray-300'} blur-2xl`} />
          <div className={`absolute inset-0 translate-y-2 rounded-[3.5rem] border-b-8 ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-gray-100 border-black/10'}`} />
          <div className={`relative w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#000] border-white/10' : 'bg-white border-black/5'}`}>
            <MapContainer center={CLINIC_LOCATION} zoom={13} zoomControl={false} scrollWheelZoom={true} zoomSnap={1} zoomDelta={1} className="w-full h-full z-0">
              {mapContent}
            </MapContainer>
          </div>

          {/* Search Panel — desktop only, floating draggable */}
          <div ref={searchRef} className="absolute top-8 right-8 z-[2015] w-full max-w-[280px] pointer-events-none">
            <motion.div 
              drag 
              dragConstraints={constraintsRef} 
              dragMomentum={false}
              dragElastic={0}
              style={{ x: searchX, y: searchY }} 
              animate={{ opacity: 1 }} 
              initial={{ opacity: 0 }}
              onDragEnd={() => { localStorage.setItem('vet_search_pos_v2', JSON.stringify({ x: searchX.get(), y: searchY.get() })); }}
              className={`${isDarkMode ? 'bg-[#141414]/80 text-white border-white/10' : 'bg-white/90 text-black border-black/10 shadow-2xl'} backdrop-blur-xl rounded-[2rem] border overflow-visible pointer-events-auto`}>
              <div className={`px-6 pt-8 pb-4 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'} cursor-grab active:cursor-grabbing relative group/header`}>
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-full group-hover/header:bg-accent transition-colors`} />
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-accent mb-0.5">Zaplanuj trasę</p>
                <h3 className={`text-lg font-black tracking-tight font-outfit ${isDarkMode ? 'text-white' : 'text-black'}`}>Jak dojechać?</h3>
              </div>
              <div className="p-4">
                {searchFormFields(false)}
              </div>
            </motion.div>
          </div>

          {/* Results Panel — desktop only, floating draggable */}
          <AnimatePresence>
            {selectedStop && (
              <div className="absolute top-8 left-8 z-[2050] w-full max-w-[340px] pointer-events-none">
                <motion.div 
                  drag 
                  dragConstraints={constraintsRef} 
                  dragMomentum={false}
                  dragElastic={0}
                  style={{ x: resultsX, y: resultsY }} 
                  animate={{ opacity: 1 }} 
                  initial={{ opacity: 0 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  onDragEnd={() => { localStorage.setItem('vet_results_pos_v2', JSON.stringify({ x: resultsX.get(), y: resultsY.get() })); }}
                  className={`relative w-full p-6 rounded-[2.5rem] pointer-events-auto flex flex-col gap-6 border shadow-3xl ${isDarkMode ? 'bg-black/80 border-white/10 text-white' : 'bg-white/90 border-black/10 text-black'} backdrop-blur-xl`}>
                  {routeResults(false)}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style jsx global>{`
        .user-location-premium { position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; }
        .user-aura { position: absolute; width: 100%; height: 100%; background: #3b82f6; border-radius: 50%; opacity: 0.15; animation: aura-pulse 3s infinite; }
        .user-glass-core { position: absolute; width: 30px; height: 30px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.4); border-radius: 50%; box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
        .user-dot { width: 12px; height: 12px; background: #3b82f6; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 0 15px #3b82f6; z-index: 2; }
        @keyframes aura-pulse { 0% { transform: scale(0.6); opacity: 0.3; } 50% { transform: scale(1); opacity: 0.1; } 100% { transform: scale(0.6); opacity: 0.3; } }
        .route-glow { filter: blur(6px); }
        .custom-div-icon { background: transparent !important; border: none !important; }
        .marker-pulse-container { position: relative; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; }
        .pulse-ring { position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #FE4520; opacity: 0.2; animation: pulse-ring 2s infinite; }
        @keyframes pulse-ring { 0% { transform: scale(0.3); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        .clinic-core { position: relative; width: 44px; height: 44px; background: #FE4520; border: 4px solid white; border-radius: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(254,69,32,0.6); transform: rotate(45deg); }
        .clinic-core svg { transform: rotate(-45deg); }
        .leaflet-container { background: transparent !important; }
        .leaflet-marker-icon { pointer-events: auto !important; }
        .leaflet-shadow-pane { display: none !important; }
        .leaflet-control-attribution { display: none !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Aggressive Grid fix for Leaflet tiles */
        .leaflet-tile {
          outline: 1px solid transparent;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          margin: -1px !important;
          padding: 1px !important;
        }
        .leaflet-tile-container img {
          width: 257px !important; /* Overlap by 1px */
          height: 257px !important;
        }
      `}</style>
    </>
  );
};

export default LeafletTransitMap;
