"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type * as Leaflet from "leaflet";
import { CalendarDays, ChevronDown, Fish, MapPin, Waves } from "lucide-react";

type FishHeatmapPoint = {
  id: string;
  lat: number;
  lng: number;
  species: string;
  count: number;
  location: string;
  country: string;
  waterType: "saltwater" | "freshwater";
  lastSeenAt: string;
};

type MapMode = "heatmap" | "points" | "cluster";

type HeatLayerFactory = typeof Leaflet & {
  heatLayer: (latlngs: Array<[number, number, number]>, options: Record<string, unknown>) => Leaflet.Layer;
};

declare global {
  interface Window {
    L?: typeof Leaflet;
  }
}

const speciesOptions = ["All Species", "Levrek", "Bass", "Clownfish", "Trout", "Salmon"];
const waterTypeOptions = ["All Waters", "Saltwater", "Freshwater"];
const dateOptions = ["Last 30 Days", "Last 7 Days", "Today"];

export default function WorldMapWorkspace() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const activeLayerRef = useRef<Leaflet.Layer | null>(null);
  const hasFitBoundsRef = useRef(false);
  const [leafletApi, setLeafletApi] = useState<HeatLayerFactory | null>(null);
  const [points, setPoints] = useState<FishHeatmapPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<FishHeatmapPoint | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>("heatmap");
  const [species, setSpecies] = useState(speciesOptions[0]);
  const [waterType, setWaterType] = useState(waterTypeOptions[0]);
  const [dateRange, setDateRange] = useState(dateOptions[0]);
  const [mapStatus, setMapStatus] = useState("Harita yukleniyor...");

  const filteredPoints = useMemo(() => {
    return points.filter((point) => {
      const speciesMatch = species === "All Species" || point.species === species;
      const waterMatch = waterType === "All Waters" || point.waterType === waterType.toLowerCase();
      return speciesMatch && waterMatch;
    });
  }, [points, species, waterType]);

  const topRegions = useMemo(() => {
    const totals = new Map<string, { country: string; count: number }>();
    for (const point of filteredPoints) {
      const current = totals.get(point.country) ?? { country: point.country, count: 0 };
      current.count += point.count;
      totals.set(point.country, current);
    }
    return Array.from(totals.values()).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [filteredPoints]);

  const mostSeenSpecies = useMemo(() => {
    const totals = new Map<string, { species: string; count: number }>();
    for (const point of filteredPoints) {
      const current = totals.get(point.species) ?? { species: point.species, count: 0 };
      current.count += point.count;
      totals.set(point.species, current);
    }
    return Array.from(totals.values()).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [filteredPoints]);

  useEffect(() => {
    fetch("/api/fish-heatmap", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        const nextPoints = data.points ?? [];
        setPoints(nextPoints);
        setSelectedPoint(nextPoints[0] ?? null);
      })
      .catch(() => setMapStatus("Harita verisi alinamadi."));
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    let cancelled = false;

    async function setupMap() {
      try {
        const leafletModule = await import("leaflet");
        const L = (leafletModule.default ?? leafletModule) as typeof Leaflet;
        window.L = L;
        await import("leaflet.heat/dist/leaflet-heat.js");
        if (cancelled || !mapContainerRef.current) return;

        const map = L.map(mapContainerRef.current, {
          center: [28, 18],
          zoom: 2,
          minZoom: 2,
          maxZoom: 8,
          zoomControl: false,
          preferCanvas: true,
          worldCopyJump: true,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution: "&copy; OpenStreetMap &copy; CARTO",
          maxZoom: 19,
          subdomains: "abcd",
        }).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);
        mapRef.current = map;
        setLeafletApi(window.L as unknown as HeatLayerFactory);
        setMapStatus("");
        window.setTimeout(() => map.invalidateSize(), 60);
      } catch {
        setMapStatus("Leaflet haritasi yuklenemedi.");
      }
    }

    setupMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletApi || !mapRef.current) return;

    renderLeafletLayer({
      L: leafletApi,
      map: mapRef.current,
      points: filteredPoints,
      mode: mapMode,
      activeLayerRef,
      setSelectedPoint,
    });

    if (!hasFitBoundsRef.current && filteredPoints.length > 1) {
      const bounds = leafletApi.latLngBounds(filteredPoints.map((point) => [point.lat, point.lng]));
      mapRef.current.fitBounds(bounds, { padding: [46, 46], maxZoom: 3 });
      hasFitBoundsRef.current = true;
    }
  }, [filteredPoints, leafletApi, mapMode]);

  return (
    <section className="fish-map-page">
      <div className="fish-map-content">
        <div className="fish-map-head">
          <div>
            <h1>Global Fish Distribution</h1>
            <p>Analizler ve topluluk kayitlarindan gelen balik gorulme yogunlugu.</p>
          </div>
          <div className="fish-map-mode">
            {(["heatmap", "points", "cluster"] as MapMode[]).map((mode) => (
              <button key={mode} className={mapMode === mode ? "fish-map-mode-active" : ""} type="button" onClick={() => setMapMode(mode)}>
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="fish-filter-bar">
          <FilterSelect label="Species" icon={<Fish size={23} />} value={species} options={speciesOptions} onChange={setSpecies} />
          <FilterSelect label="Date" icon={<CalendarDays size={23} />} value={dateRange} options={dateOptions} onChange={setDateRange} />
          <FilterSelect label="Water Type" icon={<Waves size={24} />} value={waterType} options={waterTypeOptions} onChange={setWaterType} />
        </div>

        <div className="fish-map-grid">
          <section className="fish-map-card fish-map-card-active">
            <div ref={mapContainerRef} className="leaflet-container-shell" />
            {mapStatus ? (
              <div className="mapbox-status">
                <Fish size={28} />
                <strong>{mapStatus}</strong>
                <span>OpenStreetMap tabanli ucretsiz harita bu alanda calisir.</span>
              </div>
            ) : null}
          </section>

          <aside className="fish-analytics-panel">
            <section>
              <h2>Selected Point</h2>
              {selectedPoint ? (
                <div className="selected-fish-point">
                  <MapPin size={18} />
                  <strong>{selectedPoint.species}</strong>
                  <span>{selectedPoint.location}</span>
                  <p>{selectedPoint.count} analiz - {selectedPoint.waterType}</p>
                </div>
              ) : (
                <p className="empty-panel-copy">Haritada bir noktaya tikla.</p>
              )}
            </section>

            <section>
              <h2>Top Regions</h2>
              {topRegions.map((region) => <MetricRow key={region.country} label={region.country} value={region.count} />)}
            </section>

            <section>
              <h2>Most Seen Species</h2>
              {mostSeenSpecies.map((item) => <MetricRow key={item.species} label={item.species} value={item.count} />)}
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="fish-filter-select">
      <span className="fish-filter-icon">{icon}</span>
      <span className="fish-filter-label">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown className="fish-filter-chevron" size={24} />
    </label>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  const width = Math.min(100, Math.max(12, value));
  return (
    <article className="metric-row">
      <div><span>{label}</span><strong>{value}</strong></div>
      <div><span style={{ width: `${width}%` }} /></div>
    </article>
  );
}

function renderLeafletLayer({
  L,
  map,
  points,
  mode,
  activeLayerRef,
  setSelectedPoint,
}: {
  L: HeatLayerFactory;
  map: Leaflet.Map;
  points: FishHeatmapPoint[];
  mode: MapMode;
  activeLayerRef: { current: Leaflet.Layer | null };
  setSelectedPoint: (point: FishHeatmapPoint) => void;
}) {
  if (activeLayerRef.current) {
    map.removeLayer(activeLayerRef.current);
    activeLayerRef.current = null;
  }

  if (mode === "heatmap") {
    activeLayerRef.current = L.heatLayer(
      points.map((point) => [point.lat, point.lng, Math.max(0.2, point.count / 45)]),
      {
        radius: 34,
        blur: 25,
        maxZoom: 8,
        minOpacity: 0.18,
        gradient: {
          0.2: "rgba(86, 190, 219, 0.25)",
          0.45: "rgba(59, 130, 246, 0.42)",
          0.72: "rgba(37, 99, 235, 0.68)",
          1.0: "rgba(19, 64, 154, 0.9)",
        },
      }
    ).addTo(map);
    return;
  }

  if (mode === "points") {
    activeLayerRef.current = L.layerGroup(
      points.map((point) => createPointMarker(L, point, setSelectedPoint))
    ).addTo(map);
    return;
  }

  activeLayerRef.current = L.layerGroup(
    groupPointsByCountry(points).map((group) => {
      const marker = L.circleMarker([group.lat, group.lng], {
        radius: Math.min(30, 12 + group.count / 3),
        color: "#ffffff",
        weight: 2,
        fillColor: "#3b82f6",
        fillOpacity: 0.86,
      });
      marker.bindTooltip(`<strong>${group.country}</strong><br/>${group.count} analiz`, { sticky: true, direction: "top" });
      marker.on("click", () => setSelectedPoint(group.representative));
      return marker;
    })
  ).addTo(map);
}

function createPointMarker(L: HeatLayerFactory, point: FishHeatmapPoint, setSelectedPoint: (point: FishHeatmapPoint) => void) {
  const marker = L.circleMarker([point.lat, point.lng], {
    radius: Math.min(15, 6 + point.count / 8),
    color: "#ffffff",
    weight: 2,
    fillColor: "#2563eb",
    fillOpacity: 0.88,
  });
  marker.bindTooltip(`<strong>${point.species}</strong><br/>Analiz: ${point.count}<br/>Konum: ${point.location}`, { sticky: true, direction: "top" });
  marker.on("click", () => setSelectedPoint(point));
  return marker;
}

function groupPointsByCountry(points: FishHeatmapPoint[]) {
  const groups = new Map<string, { country: string; lat: number; lng: number; count: number; representative: FishHeatmapPoint; totalLat: number; totalLng: number; size: number }>();

  for (const point of points) {
    const current = groups.get(point.country) ?? {
      country: point.country,
      lat: point.lat,
      lng: point.lng,
      count: 0,
      representative: point,
      totalLat: 0,
      totalLng: 0,
      size: 0,
    };
    current.count += point.count;
    current.totalLat += point.lat;
    current.totalLng += point.lng;
    current.size += 1;
    current.lat = current.totalLat / current.size;
    current.lng = current.totalLng / current.size;
    if (point.count > current.representative.count) current.representative = point;
    groups.set(point.country, current);
  }

  return Array.from(groups.values());
}
