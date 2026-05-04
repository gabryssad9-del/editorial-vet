'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, Trash2, RotateCcw, Search, ChevronRight, Bus, Footprints } from 'lucide-react';

const CLINIC_ADDRESS = 'Klinika VetMed – ul. Pana Tadeusza 6, Olsztyn';

interface HistoryEntry {
  id: string;
  from: string;
  to: string;
  timestamp: number;
}

const STORAGE_KEY = 'vetmed_transit_history';

function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveToHistory(from: string, to: string) {
  if (!from.trim() || !to.trim()) return;
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    from: from.trim(),
    to: to.trim(),
    timestamp: Date.now(),
  };
  // avoid duplicates (same from+to in last 10 entries)
  const filtered = history.filter(
    (h) => !(h.from === entry.from && h.to === entry.to)
  );
  const updated = [entry, ...filtered].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'przed chwilą';
  if (minutes < 60) return `${minutes} min temu`;
  if (hours < 24) return `${hours} godz. temu`;
  return `${days} dni temu`;
}

export const TransitPlanner = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState(CLINIC_ADDRESS);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeField, setActiveField] = useState<'from' | 'to' | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { url: string; label: string }>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowHistory(false);
        setActiveField(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = async () => {
    if (!from.trim()) return;
    setIsSearching(true);
    setSearchResult(null);

    // Save to history first
    saveToHistory(from, to);
    setHistory(getHistory());

    // Build Google Maps / jakdojade-style URL
    const destination = encodeURIComponent('ul. Pana Tadeusza 6, Olsztyn, Polska');
    const origin = encodeURIComponent(from);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;

    await new Promise((r) => setTimeout(r, 800)); // short animation delay
    setIsSearching(false);
    setSearchResult({ url, label: `${from} → ${to}` });
  };

  const handleHistoryClick = (entry: HistoryEntry) => {
    setFrom(entry.from);
    setTo(entry.to);
    setShowHistory(false);
    setActiveField(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = getHistory().filter((h) => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setHistory(updated);
  };

  const handleClearAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  const swapFields = () => {
    setFrom(to === CLINIC_ADDRESS ? '' : to);
    setTo(from || CLINIC_ADDRESS);
  };

  const filteredHistory = history.filter((h) => {
    if (activeField === 'from') return h.from.toLowerCase().includes(from.toLowerCase());
    if (activeField === 'to') return h.to.toLowerCase().includes(to.toLowerCase());
    return true;
  });

  return (
    <section className="py-24 md:py-32 px-4 md:px-8" id="jak-dojechac">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-6"
          >
            <Bus size={12} />
            Jak dojechać
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-outfit font-black tracking-tighter leading-none mb-6"
          >
            Zaplanuj <span className="text-accent italic">trasę</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-foreground/50 font-medium max-w-xl mx-auto"
          >
            Wpisz, skąd wyruszasz, a my pokażemy Ci najszybszą trasę do kliniki.
          </motion.p>
        </div>

        {/* Planner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          ref={wrapperRef}
          className="relative bg-background/80 backdrop-blur-xl border border-border rounded-[2.5rem] shadow-premium overflow-visible"
        >
          <div className="p-6 md:p-10">
            {/* Fields */}
            <div className="flex flex-col gap-3 relative">
              {/* FROM */}
              <div className="relative">
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-accent mb-2 pl-1">
                  Skąd jedziemy?
                </label>
                <div className={`flex items-center gap-3 bg-secondary/60 border-2 rounded-2xl px-5 py-4 transition-all duration-300 ${activeField === 'from' ? 'border-accent shadow-[0_0_0_4px_rgba(254,69,32,0.12)]' : 'border-border'}`}>
                  <Navigation size={18} className="text-accent shrink-0" />
                  <input
                    type="text"
                    placeholder="Twoja lokalizacja lub adres..."
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => { setActiveField('from'); setShowHistory(true); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-transparent outline-none text-base font-semibold text-foreground placeholder:text-foreground/30"
                  />
                  {from && (
                    <button onClick={() => setFrom('')} className="text-foreground/30 hover:text-accent transition-colors">
                      <RotateCcw size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Swap button */}
              <div className="flex justify-center -my-1 z-10 relative">
                <button
                  onClick={swapFields}
                  className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all"
                  title="Zamień"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* TO */}
              <div className="relative">
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40 mb-2 pl-1">
                  Dokąd jedziemy?
                </label>
                <div className={`flex items-center gap-3 bg-secondary/60 border-2 rounded-2xl px-5 py-4 transition-all duration-300 ${activeField === 'to' ? 'border-accent shadow-[0_0_0_4px_rgba(254,69,32,0.12)]' : 'border-border'}`}>
                  <MapPin size={18} className="text-foreground/40 shrink-0" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => { setActiveField('to'); setShowHistory(true); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-transparent outline-none text-base font-semibold text-foreground placeholder:text-foreground/30"
                  />
                </div>
              </div>

              {/* History dropdown */}
              <AnimatePresence>
                {showHistory && filteredHistory.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-background/95 backdrop-blur-2xl border border-border rounded-2xl shadow-premium overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] text-foreground/40">
                        <Clock size={11} />
                        Historia wyszukiwań
                      </div>
                      {history.length > 0 && (
                        <button
                          onClick={handleClearAll}
                          className="text-[9px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={10} /> Wyczyść
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {filteredHistory.map((entry) => (
                        <motion.div
                          key={entry.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          onClick={() => handleHistoryClick(entry)}
                          className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/5 cursor-pointer group transition-colors border-b border-border/20 last:border-b-0"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
                            <Clock size={13} className="text-foreground/30" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-sm font-bold text-foreground truncate">
                              <span className="text-foreground/60 truncate">{entry.from}</span>
                              <ChevronRight size={12} className="text-accent shrink-0" />
                              <span className="truncate">{entry.to}</span>
                            </div>
                            <p className="text-[10px] font-medium text-foreground/30 mt-0.5">
                              {formatRelativeTime(entry.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleDelete(entry.id, e)}
                            className="opacity-0 group-hover:opacity-100 text-foreground/30 hover:text-red-500 transition-all shrink-0"
                          >
                            <Trash2 size={13} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button */}
            <motion.button
              onClick={handleSearch}
              disabled={!from.trim() || isSearching}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-accent text-white py-5 rounded-2xl font-black text-base tracking-wide shadow-glow hover:shadow-[0_0_40px_rgba(254,69,32,0.5)] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSearching ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Szukam trasy...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Pokaż trasę
                </>
              )}
            </motion.button>

            {/* Result */}
            <AnimatePresence>
              {searchResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 overflow-hidden"
                >
                  <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5">
                    <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-3">
                      Trasa znaleziona
                    </p>
                    <p className="text-sm font-semibold text-foreground/70 mb-4 truncate">
                      {searchResult.label}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={searchResult.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-accent text-white py-3 px-5 rounded-xl font-black text-sm hover:bg-accent/90 transition-colors"
                      >
                        <Bus size={15} />
                        Otwórz w Google Maps
                      </a>
                      <a
                        href={`https://jakdojade.pl/olsztyn/trasa?from=${encodeURIComponent(from)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary border border-border text-foreground py-3 px-5 rounded-xl font-black text-sm hover:border-accent/50 transition-colors"
                      >
                        <Footprints size={15} />
                        Otwórz Jakdojade
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info bar */}
          <div className="border-t border-border/50 px-6 md:px-10 py-4 flex flex-wrap gap-6 items-center bg-secondary/20">
            <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
              <MapPin size={12} className="text-accent" />
              ul. Pana Tadeusza 6, Olsztyn
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
              <Clock size={12} className="text-accent" />
              Pon–Pt: 8:00 – 20:00 · Sob: 9:00 – 14:00
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
