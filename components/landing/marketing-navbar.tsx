import Link from "next/link";

export default function MarketingNavbar() {
  return (
    <nav style={{ position: "absolute", zIndex: 2, top: 0, left: 0, right: 0, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="brand">AQUASCOPE</Link>
        <Link href="/platform" className="button">Platforma gir</Link>
      </div>
    </nav>
  );
}
