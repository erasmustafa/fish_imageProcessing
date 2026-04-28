import Link from "next/link";

const items = [
  ["Panel", "/platform/dashboard"],
  ["Analiz", "/platform/analyze"],
  ["Kütüphane", "/platform/library"],
  ["Harita", "/platform/map"],
  ["Topluluk", "/platform/social"],
  ["Mesajlar", "/platform/messages"],
  ["Profil", "/platform/profile"],
  ["Ayarlar", "/platform/settings"],
];

const exactItems = [
  ["Panolar", "/platform/dashboard"],
  ["Analiz Et", "/platform/analyze"],
  ["Tür Kütüphanesi", "/platform/library"],
  ["Geçmiş", "/platform/messages"],
  ["Raporlar", "/platform/social"],
  ["Ayarlar", "/platform/settings"],
  ["Notifikarlar", "/platform/profile"],
  ["API Keys", "/platform/profile"],
];

export default function MobilePlatformNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobil platform">
      {exactItems.map(([label, href]) => (
        <Link key={href} href={href} className="nav-link">
          {label}
        </Link>
      ))}
    </nav>
  );
}
