import { marinePoints } from "../../../lib/constants";

export default function MarineMapView() {
  return (
    <section
      className="surface"
      style={{
        minHeight: 520,
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(47,198,214,0.18), rgba(7,17,31,0.1)), url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {marinePoints.map((point, index) => (
        <div
          key={point.id}
          style={{
            position: "absolute",
            left: `${28 + index * 22}%`,
            top: `${30 + index * 15}%`,
            width: 86,
            height: 86,
            borderRadius: 86,
            display: "grid",
            placeItems: "center",
            background: "rgba(47, 198, 214, 0.26)",
            border: "1px solid rgba(255,255,255,0.45)",
            backdropFilter: "blur(4px)",
          }}
          title={point.name}
        >
          <strong>{point.density}%</strong>
        </div>
      ))}
    </section>
  );
}
