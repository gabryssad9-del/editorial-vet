// @ts-nocheck
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CLINIC_LOCATION: [number, number] = [53.774567, 20.485121];

const HUBS = {
  KOLOBRZESKA: { name: "Kołobrzeska", pos: [53.7770, 20.4868] as [number, number] },
  STADION: { name: "Stadion Stomil", pos: [53.7730, 20.4920] as [number, number] }
};

const CITY_STOPS = [
  { name: "Jaroty", pos: [53.7435, 20.4950], hub: 'STADION' },
  { name: "Nagórki", pos: [53.7550, 20.5020], hub: 'STADION' },
  { name: "Pieczewo", pos: [53.7480, 20.5150], hub: 'STADION' },
  { name: "Sikorskiego", pos: [53.7580, 20.4850], hub: 'STADION' },
  { name: "Kortowo", pos: [53.7610, 20.4620], hub: 'KOLOBRZESKA' },
  { name: "Dworzec Główny", pos: [53.7845, 20.4935], hub: 'KOLOBRZESKA' },
  { name: "Aura / Centrum", pos: [53.7765, 20.4770], hub: 'KOLOBRZESKA' },
  { name: "Zatorze", pos: [53.7950, 20.4850], hub: 'KOLOBRZESKA' },
  { name: "Likusy", pos: [53.7920, 20.4350], hub: 'KOLOBRZESKA' },
  { name: "Track", pos: [53.7950, 20.5450], hub: 'KOLOBRZESKA' },
];

const MapClient = () => {
  const [outerRoutes, setOuterRoutes] = useState<{path: [number, number][], hub: string}[]>([]);
  const [hubRoutes, setHubRoutes] = useState<{path: [number, number][], name: string}[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      // 1. Pobieramy trasy z Hubów do Kliniki (Najważniejsze)
      const hubData = [];
      for (const hub of Object.values(HUBS)) {
        try {
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${hub.pos[1]},${hub.pos[0]};${CLINIC_LOCATION[1]},${CLINIC_LOCATION[0]}?overview=full&geometries=geojson`);
          const data = await res.json();
          if (data.routes?.[0]) {
            hubData.push({ name: hub.name, path: data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]) });
          } else {
            // Fallback
            hubData.push({ name: hub.name, path: [hub.pos, CLINIC_LOCATION] as [number, number][] });
          }
        } catch (e) {
          hubData.push({ name: hub.name, path: [hub.pos, CLINIC_LOCATION] as [number, number][] });
        }
      }
      setHubRoutes(hubData);

      // 2. Pobieramy trasy z Miasta do Hubów z opóźnieniem (Sequential fetch to avoid rate limit)
      const outerData: any[] = [];
      for (const stop of CITY_STOPS) {
        const hubPos = stop.hub === 'KOLOBRZESKA' ? HUBS.KOLOBRZESKA.pos : HUBS.STADION.pos;
        try {
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${stop.pos[1]},${stop.pos[0]};${hubPos[1]},${hubPos[0]}?overview=full&geometries=geojson`);
          const data = await res.json();
          if (data.routes?.[0]) {
            outerData.push({ hub: stop.hub, path: data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]) });
          } else {
            outerData.push({ hub: stop.hub, path: [stop.pos, hubPos] });
          }
        } catch (e) {
          outerData.push({ hub: stop.hub, path: [stop.pos, hubPos] });
        }
        // Minimalne opóźnienie między strzałami do API
        setOuterRoutes([...outerData]);
        await new Promise(r => setTimeout(r, 100));
      }
    };

    fetchRoutes();
  }, []);

  const Icons = useMemo(() => {
    if (typeof window === 'undefined') return {};
    return {
      Clinic: L.divIcon({
        className: 'clinic-icon',
        html: `<div class="relative flex items-center justify-center">
                <div class="absolute w-24 h-24 bg-[#FE4520] rounded-full animate-pulse opacity-10"></div>
                <div class="relative w-12 h-12 bg-[#FE4520] rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
              </div>`,
        iconSize: [80, 80], iconAnchor: [40, 40]
      }),
      Hub: L.divIcon({
        className: 'hub-icon',
        html: `<div class="w-6 h-6 bg-white border-4 border-[#FE4520] rounded-full shadow-lg flex items-center justify-center">
                <div class="w-1.5 h-1.5 bg-[#FE4520] rounded-full animate-ping"></div>
              </div>`,
        iconSize: [24, 24], iconAnchor: [12, 12]
      }),
      Stop: L.divIcon({
        className: 'stop-icon',
        html: `<div class="w-2 h-2 bg-[#FE4520] rounded-full opacity-60"></div>`,
        iconSize: [8, 8], iconAnchor: [4, 4]
      })
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <MapContainer center={CLINIC_LOCATION} zoom={13} scrollWheelZoom={false} className="w-full h-full z-0">
        <TileLayer attribution='&copy; CARTO' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {/* Trasy: Miasto -> Huby */}
        {outerRoutes.map((route, i) => (
          <Polyline key={`outer-${i}`} positions={route.path as any} pathOptions={{ color: '#FE4520', weight: 2, opacity: 0.3, dashArray: '5, 10', className: 'flow-slow' }} />
        ))}

        {/* Trasy: Huby -> VetMed */}
        {hubRoutes.map((route, i) => (
          <React.Fragment key={`hub-group-${i}`}>
            <Polyline positions={route.path as any} pathOptions={{ color: '#FE4520', weight: 8, opacity: 0.1, lineCap: 'round' }} />
            <Polyline positions={route.path as any} pathOptions={{ color: '#FE4520', weight: 5, opacity: 0.9, lineCap: 'round', className: 'flow-fast' }} />
          </React.Fragment>
        ))}

        {CITY_STOPS.map((stop, i) => <Marker key={`stop-${i}`} position={stop.pos as any} icon={Icons.Stop!} />)}
        {Object.values(HUBS).map((hub, i) => <Marker key={`hub-${i}`} position={hub.pos as any} icon={Icons.Hub!} />)}
        <Marker position={CLINIC_LOCATION} icon={Icons.Clinic!} />
      </MapContainer>

      <style jsx global>{`
        @keyframes flow { to { stroke-dashoffset: -40; } }
        .flow-slow { stroke-dasharray: 8, 16; animation: flow 3s linear infinite; }
        .flow-fast { stroke-dasharray: 12, 12; animation: flow 1.2s linear infinite; }
        .leaflet-container { background: #f5f5f5 !important; }
        .clinic-icon, .hub-icon, .stop-icon { background: transparent !important; border: none !important; }
      `}</style>
    </div>
  );
};

export default MapClient;
