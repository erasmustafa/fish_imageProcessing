"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type * as Leaflet from "leaflet";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Filter,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import PlatformUtilityBar from "../shell/platform-utility-bar";

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

const speciesOptions = ["All Species", "Largemouth Bass", "Perch", "Bluefin Tuna", "Salmon", "Rainbow Trout"];
const waterTypeOptions = ["All Water Types", "Saltwater", "Freshwater"];
const dateOptions = ["Last 30 Days", "Last 7 Days", "Today"];
const modeLabels: Record<MapMode, string> = {
  heatmap: "Heatmap",
  points: "Points",
  cluster: "Cluster",
};

const countryMeta: Record<string, { code: string; species?: string }> = {
  "United States": { code: "US", species: "Largemouth Bass" },
  Norway: { code: "NO", species: "Perch" },
  Japan: { code: "JP", species: "Bluefin Tuna" },
  Turkey: { code: "TR", species: "Sea Bass" },
};

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
  const [mapStatus, setMapStatus] = useState("Map is loading...");

  const filteredPoints = useMemo(() => {
    return points.filter((point) => {
      const speciesMatch = species === "All Species" || point.species === species;
      const waterMatch = waterType === "All Water Types" || point.waterType === waterType.toLowerCase();
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
    return Array.from(totals.values()).sort((a, b) => b.count - a.count).slice(0, 4);
  }, [filteredPoints]);

  const mostSeenSpecies = useMemo(() => {
    const totals = new Map<string, { species: string; count: number }>();
    for (const point of filteredPoints) {
      const current = totals.get(point.species) ?? { species: point.species, count: 0 };
      current.count += point.count;
      totals.set(point.species, current);
    }
    return Array.from(totals.values()).sort((a, b) => b.count - a.count).slice(0, 4);
  }, [filteredPoints]);

  const recentHotspots = useMemo(() => {
    return filteredPoints
      .slice()
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .map((point) => ({ label: point.location, count: point.count, country: point.country }));
  }, [filteredPoints]);

  const totalAnalysed = filteredPoints.reduce((sum, point) => sum + point.count, 0);
  const mostActiveRegion = topRegions[0];
  const topSpecies = mostSeenSpecies[0];

  useEffect(() => {
    fetch("/api/fish-heatmap", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        const nextPoints = data.points ?? [];
        setPoints(nextPoints);
        setSelectedPoint(nextPoints[0] ?? null);
      })
      .catch(() => setMapStatus("Map data could not be loaded."));
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
          center: [24, 12],
          zoom: 2,
          minZoom: 2,
          maxZoom: 8,
          zoomControl: false,
          preferCanvas: true,
          worldCopyJump: true,
          attributionControl: false,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
          subdomains: "abcd",
        }).addTo(map);

        mapRef.current = map;
        setLeafletApi(window.L as unknown as HeatLayerFactory);
        setMapStatus("");
        window.setTimeout(() => map.invalidateSize(), 60);
      } catch {
        setMapStatus("Leaflet map failed to load.");
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

  function zoomMap(direction: "in" | "out") {
    if (!mapRef.current) return;
    mapRef.current[direction === "in" ? "zoomIn" : "zoomOut"]();
  }

  return (
    <section className="dark-map-page">
      <PlatformUtilityBar />

      <div className="dark-map-shell">
        <header className="dark-page-head">
          <div>
            <h1>Global Fish Distribution</h1>
            <p>Explore where fish species have been sighted around the world.</p>
          </div>
        </header>

        <div className="dark-map-filters">
          <DarkFilterSelect label="Species" value={species} options={speciesOptions} onChange={setSpecies} />
          <DarkFilterSelect
            label="Date Range"
            icon={<CalendarDays size={18} />}
            value={dateRange}
            options={dateOptions}
            onChange={setDateRange}
          />
          <DarkFilterSelect label="Water Type" value={waterType} options={waterTypeOptions} onChange={setWaterType} />
          <DarkFilterSelect
            label="Layer"
            value={modeLabels[mapMode]}
            options={Object.values(modeLabels)}
            onChange={(value) => {
              const next = (Object.entries(modeLabels).find(([, label]) => label === value)?.[0] ?? "heatmap") as MapMode;
              setMapMode(next);
            }}
          />
          <button type="button" className="dark-filter-button">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="dark-map-layout">
          <div className="dark-map-main">
            <section className="dark-map-canvas-card">
              <div ref={mapContainerRef} className="dark-map-canvas" />

              <div className="dark-map-toolbar dark-map-toolbar--left">
                <button type="button" onClick={() => zoomMap("in")} aria-label="Zoom in">
                  <Plus size={18} />
                </button>
                <button type="button" onClick={() => zoomMap("out")} aria-label="Zoom out">
                  <Minus size={18} />
                </button>
              </div>

              <div className="dark-map-toolbar dark-map-toolbar--right">
                <button type="button" aria-label="Search map">
                  <Search size={18} />
                </button>
                <button type="button" aria-label="Download report">
                  <Download size={18} />
                </button>
              </div>

              {selectedPoint ? (
                <div className="dark-map-callout">
                  <strong>{selectedPoint.country}</strong>
                  <span>{selectedPoint.count} analyzed</span>
                  <small>Common Species: {selectedPoint.species}</small>
                </div>
              ) : null}

              <div className="dark-map-legend">
                <div className="dark-map-legend-title">
                  <strong>Observation Density</strong>
                  <span>i</span>
                </div>
                <div className="dark-map-gradient" />
                <div className="dark-map-legend-scale">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>

              {mapStatus ? (
                <div className="dark-map-status">
                  <strong>{mapStatus}</strong>
                </div>
              ) : null}
            </section>

            <div className="dark-map-stats">
              <StatCard
                title="Most Active Region"
                value={mostActiveRegion ? mostActiveRegion.country : "United States"}
                subtitle={`${mostActiveRegion ? mostActiveRegion.count : 437} analyzed`}
                flagCode={countryMeta[mostActiveRegion?.country ?? "United States"]?.code ?? "US"}
              />
              <StatCard title="Total Analyzed Fish Photos" value={totalAnalysed.toLocaleString()} subtitle="Total analyzed" />
              <StatCard title="Most Seen Species" value={String(topSpecies?.count ?? 249)} subtitle={topSpecies?.species ?? "Largemouth Bass"} />
              <StatCard title="Water Type" value={waterType} subtitle="Included" />
            </div>
          </div>

          <aside className="dark-map-side">
            <SidePanel
              title="Top Regions"
              items={topRegions.map((item) => ({
                label: item.country,
                value: item.count,
                prefix: countryMeta[item.country]?.code ?? item.country.slice(0, 2).toUpperCase(),
              }))}
            />

            <SidePanel
              title="Most Seen Species"
              items={mostSeenSpecies.map((item) => ({
                label: item.species,
                value: item.count,
                prefix: "Fish",
              }))}
            />

            <SidePanel
              title="Recent Hotspots"
              items={recentHotspots.map((item) => ({
                label: item.label,
                value: item.count,
                prefix: countryMeta[item.country]?.code ?? item.country.slice(0, 2).toUpperCase(),
              }))}
            />

            <a className="dark-map-report-link" href="/platform/analyze">
              View Full Report
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DarkFilterSelect({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon?: ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="dark-filter-select">
      <span className="dark-filter-label">
        {icon}
        {label}
      </span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={18} />
    </label>
  );
}

function SidePanel({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: number; prefix: string }>;
}) {
  return (
    <section className="dark-side-panel">
      <div className="dark-side-panel-head">
        <h2>{title}</h2>
        <a href="/platform/analyze">View all</a>
      </div>
      <div className="dark-side-panel-list">
        {items.map((item) => (
          <article key={item.label}>
            <div className="dark-side-panel-entry">
              <span className="dark-side-panel-flag">{item.prefix}</span>
              <strong>{item.label}</strong>
            </div>
            <small>{item.value}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  flagCode,
}: {
  title: string;
  value: string;
  subtitle: string;
  flagCode?: string;
}) {
  return (
    <article className="dark-map-stat-card">
      <div className="dark-map-stat-head">
        <h3>{title}</h3>
        <span>i</span>
      </div>
      <div className="dark-map-stat-value">
        {flagCode ? <b className="dark-map-flag-pill">{flagCode}</b> : null}
        <strong>{value}</strong>
      </div>
      <p>{subtitle}</p>
      <div className="dark-map-stat-wave" />
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
        minOpacity: 0.2,
        gradient: {
          0.18: "rgba(37, 197, 255, 0.2)",
          0.45: "rgba(54, 224, 211, 0.55)",
          0.68: "rgba(255, 213, 86, 0.82)",
          0.82: "rgba(255, 125, 87, 0.92)",
          1.0: "rgba(255, 67, 124, 1)",
        },
      }
    ).addTo(map);
    return;
  }

  if (mode === "points") {
    activeLayerRef.current = L.layerGroup(points.map((point) => createPointMarker(L, point, setSelectedPoint))).addTo(map);
    return;
  }

  activeLayerRef.current = L.layerGroup(
    groupPointsByCountry(points).map((group) => {
      const marker = L.circleMarker([group.lat, group.lng], {
        radius: Math.min(26, 10 + group.count / 4),
        color: "#e8fbff",
        weight: 2,
        fillColor: "#12b8ff",
        fillOpacity: 0.84,
      });
      marker.bindTooltip(`<strong>${group.country}</strong><br/>${group.count} analyzed`, {
        sticky: true,
        direction: "top",
      });
      marker.on("click", () => setSelectedPoint(group.representative));
      return marker;
    })
  ).addTo(map);
}

function createPointMarker(L: HeatLayerFactory, point: FishHeatmapPoint, setSelectedPoint: (point: FishHeatmapPoint) => void) {
  const marker = L.circleMarker([point.lat, point.lng], {
    radius: Math.min(14, 6 + point.count / 10),
    color: "#ffffff",
    weight: 2,
    fillColor: "#14c8ff",
    fillOpacity: 0.88,
  });
  marker.bindTooltip(`<strong>${point.species}</strong><br/>Analyzed: ${point.count}<br/>Location: ${point.location}`, {
    sticky: true,
    direction: "top",
  });
  marker.on("click", () => setSelectedPoint(point));
  return marker;
}

function groupPointsByCountry(points: FishHeatmapPoint[]) {
  const groups = new Map<
    string,
    {
      country: string;
      lat: number;
      lng: number;
      count: number;
      representative: FishHeatmapPoint;
      totalLat: number;
      totalLng: number;
      size: number;
    }
  >();

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
