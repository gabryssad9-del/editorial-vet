'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Info, Clock, Footprints } from 'lucide-react';

const CLINIC_LOCATION = { lat: 53.774567, lng: 20.485121 };
const HUBS = {
  KOLOBRZESKA: { name: "Kołobrzeska", pos: { lat: 53.7770, lng: 20.4868 }, walkTime: "4 min", distance: "350m" },
  STADION: { name: "Stadion Stomil", pos: { lat: 53.7730, lng: 20.4920 }, walkTime: "7 min", distance: "550m" }
};

const STOPS_DATABASE = [
  { id: 'j1', name: "Jaroty - Wilczyńskiego", pos: { lat: 53.7435, lng: 20.4950 }, hub: 'STADION' },
  { id: 'j2', name: "Jaroty - Kanta", pos: { lat: 53.7460, lng: 20.5010 }, hub: 'STADION' },
  { id: 'p1', name: "Pieczewo", pos: { lat: 53.7480, lng: 20.5150 }, hub: 'STADION' },
  { id: 'n1', name: "Nagórki", pos: { lat: 53.7550, lng: 20.5020 }, hub: 'STADION' },
  { id: 's1', name: "Sikorskiego / Galeria", pos: { lat: 53.7580, lng: 20.4850 }, hub: 'STADION' },
  { id: 'c1', name: "Aura / Centrum", pos: { lat: 53.7765, lng: 20.4770 }, hub: 'KOLOBRZESKA' },
  { id: 'c2', name: "Wysoka Brama", pos: { lat: 53.7790, lng: 20.4760 }, hub: 'KOLOBRZESKA' },
  { id: 'd1', name: "Dajtki", pos: { lat: 53.7650, lng: 20.4300 }, hub: 'KOLOBRZESKA' },
  { id: 'k1', name: "Kortowo - Uniwersytet", pos: { lat: 53.7610, lng: 20.4620 }, hub: 'KOLOBRZESKA' },
  { id: 'z1', name: "Zatorze - Wojska Polskiego", pos: { lat: 53.7950, lng: 20.4850 }, hub: 'KOLOBRZESKA' },
  { id: 'z2', name: "Limanowskiego", pos: { lat: 53.7900, lng: 20.4950 }, hub: 'KOLOBRZESKA' },
  { id: 'dw1', name: "Dworzec Główny", pos: { lat: 53.7845, lng: 20.4935 }, hub: 'KOLOBRZESKA' },
  { id: 'l1', name: "Likusy", pos: { lat: 53.7920, lng: 20.4350 }, hub: 'KOLOBRZESKA' },
  { id: 'g1', name: "Gutkowo", pos: { lat: 53.8050, lng: 20.4050 }, hub: 'KOLOBRZESKA' },
  { id: 'po1', name: "Pojezierze", pos: { lat: 53.7780, lng: 20.5020 }, hub: 'KOLOBRZESKA' },
  { id: 'tr1', name: "Track", pos: { lat: 53.7950, lng: 20.5450 }, hub: 'KOLOBRZESKA' }
];

const GoogleMapClient = () => {
  const [selectedStop, setSelectedStop] = useState<any | null>(null);
  const [activePath, setActivePath] = useState<any[]>([]);

  const fetchRoute = async (start: any, end: any) => {
    try {
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`);
      const data = await res.json();
      return data.routes?.[0]?.geometry.coordinates.map((c: any) => ({ lat: c[1], lng: c[0] })) || [];
    } catch (e) {
      return [start, end];
    }
  };

  const handleStopClick = async (stop: any) => {
    const hub = stop.hub === 'KOLOBRZESKA' ? HUBS.KOLOBRZESKA : HUBS.STADION;
    const stage1 = await fetchRoute(stop.pos, hub.pos);
    const stage2 = await fetchRoute(hub.pos, CLINIC_LOCATION);
    setActivePath([...stage1, ...stage2]);
    setSelectedStop(stop);
  };

  return (
    <APIProvider apiKey={"YOUR_GOOGLE_MAPS_API_KEY_HERE"}>
      <div className="w-full h-full relative font-outfit">
        <Map
          defaultCenter={CLINIC_LOCATION}
          defaultZoom={13}
          mapId={"bf51a910020fa25a"}
          disableDefaultUI={true}
          className="w-full h-full grayscale-[0.3]"
        >
          {/* Przystanki */}
          {STOPS_DATABASE.map((stop) => (
            <AdvancedMarker
              key={stop.id}
              position={stop.pos}
              onClick={() => handleStopClick(stop)}
            >
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className={`w-3 h-3 rounded-full border-2 border-white shadow-xl transition-all duration-500 cursor-pointer ${selectedStop?.id === stop.id ? 'bg-accent scale-150 ring-4 ring-accent/30' : 'bg-gray-400 opacity-40 hover:opacity-100 hover:bg-accent'}`} 
              />
            </AdvancedMarker>
          ))}

          {/* Huby */}
          {Object.entries(HUBS).map(([key, hub]) => (
            <AdvancedMarker key={key} position={hub.pos}>
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full border-2 transition-all duration-700 ${selectedStop?.hub === key ? 'bg-accent border-white scale-125' : 'bg-white border-accent'}`}>
                  <div className={`w-2 h-2 rounded-full ${selectedStop?.hub === key ? 'bg-white animate-ping' : 'bg-accent'}`} />
                </div>
              </div>
            </AdvancedMarker>
          ))}

          {/* VetMed HQ */}
          <AdvancedMarker position={CLINIC_LOCATION}>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 bg-accent rounded-full animate-pulse opacity-10" />
              <div className="relative w-14 h-14 bg-accent rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white z-10">
                 <Navigation size={28} />
              </div>
            </div>
          </AdvancedMarker>

          <RouteRenderer path={activePath} />
        </Map>

        {/* --- Interaktywny Panel Informacyjny (Faza 3, 4, 5) --- */}
        <AnimatePresence>
          {selectedStop && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute top-10 right-10 z-20 max-w-sm w-full"
            >
              <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-white flex flex-col gap-6">
                 <div className="flex justify-between items-start">
                    <div>
                       <p className="text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-1">Wybrana trasa</p>
                       <h4 className="text-2xl font-black tracking-tighter leading-none">{selectedStop.name}</h4>
                    </div>
                    <button 
                      onClick={() => { setSelectedStop(null); setActivePath([]); }}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-accent hover:text-white transition-all"
                    >
                      ×
                    </button>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                          <Navigation size={20} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black uppercase opacity-40">Przesiadka</p>
                          <p className="text-sm font-bold">Hub {HUBS[selectedStop.hub as keyof typeof HUBS].name}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-2xl border border-accent/10">
                       <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                          <Footprints size={20} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black uppercase text-accent/60">Dojście z Hubu</p>
                          <p className="text-sm font-black text-accent">{HUBS[selectedStop.hub as keyof typeof HUBS].walkTime} ({HUBS[selectedStop.hub as keyof typeof HUBS].distance})</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                       <Clock size={14} className="text-gray-400" />
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Całkowity czas na oko: ~{parseInt(HUBS[selectedStop.hub as keyof typeof HUBS].walkTime) + 12} min</p>
                    </div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&origin=${selectedStop.pos.lat},${selectedStop.pos.lng}&destination=${CLINIC_LOCATION.lat},${CLINIC_LOCATION.lng}&travelmode=transit`}
                      target="_blank"
                      className="w-full bg-foreground text-background py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all duration-500"
                    >
                       Otwórz w Google Maps <Navigation size={14} />
                    </a>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Globalne style dla Polyline (Faza 5) */}
        <style jsx global>{`
          .google-polyline-active {
            stroke-dasharray: 10, 20;
            animation: dash 2s linear infinite;
          }
          @keyframes dash { to { stroke-dashoffset: -30; } }
        `}</style>
      </div>
    </APIProvider>
  );
};

const RouteRenderer = ({ path }: { path: any[] }) => {
  const map = useMap();
  const maps = useMapsLibrary('maps');
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !maps || path.length === 0) return;
    if (polyline) polyline.setMap(null);

    const newPolyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FE4520',
      strokeOpacity: 0.9,
      strokeWeight: 6,
      map: map,
      icons: [{
        icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 4, strokeColor: '#FE4520' },
        offset: '0',
        repeat: '20px'
      }]
    });

    setPolyline(newPolyline);
    const bounds = new google.maps.LatLngBounds();
    path.forEach(p => bounds.extend(p));
    map.fitBounds(bounds, 100);

    return () => newPolyline.setMap(null);
  }, [map, maps, path]);

  return null;
};

export default GoogleMapClient;
