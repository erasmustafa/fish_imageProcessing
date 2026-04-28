"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Clock3,
  FileText,
  Home,
  KeyRound,
  MoreHorizontal,
  Search,
  Waves,
} from "lucide-react";
import { BarChart3, BookOpen, Fish, Map, MessageCircle, Settings, Share2, User } from "lucide-react";

const items = [
  { href: "/platform/dashboard", label: "Panel", icon: BarChart3 },
  { href: "/platform/analyze", label: "Analiz", icon: Fish },
  { href: "/platform/library", label: "Kütüphane", icon: BookOpen },
  { href: "/platform/map", label: "Harita", icon: Map },
  { href: "/platform/social", label: "Topluluk", icon: Share2 },
  { href: "/platform/messages", label: "Mesajlar", icon: MessageCircle },
  { href: "/platform/profile", label: "Profil", icon: User },
  { href: "/platform/settings", label: "Ayarlar", icon: Settings },
];

function LegacyPlatformSidebar() {
  return (
    <aside className="sidebar">
      <Link href="/" className="brand">
        <Fish size={24} />
        AQUASCOPE
      </Link>
      <nav className="nav-list" aria-label="Platform">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="nav-link">
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

const mainSidebarItems = [
  { href: "/platform/dashboard", label: "Panolar", icon: Home },
  { href: "/platform/analyze", label: "Analiz Et", icon: Search },
  { href: "/platform/library", label: "Tür Kütüphanesi", icon: BookOpen },
  { href: "/platform/messages", label: "Geçmiş", icon: Clock3 },
  { href: "/platform/social", label: "Raporlar", icon: BarChart3 },
  { href: "/platform/settings", label: "Ayarlar", icon: Settings },
];

const accountSidebarItems = [
  { href: "/platform/profile", label: "Notifikarlar", icon: Bell },
  { href: "/platform/profile", label: "API Keys", icon: KeyRound },
];

export default function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <Link href="/" className="brand">
          <span className="sidebar-logo">
            <Waves size={20} />
          </span>
          <span>AquaScope</span>
        </Link>
        <button className="sidebar-search" type="button" aria-label="Search">
          <Search size={18} />
        </button>
      </div>

      <nav className="nav-list" aria-label="Main navigation">
        {mainSidebarItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link nav-link-active" : "nav-link"}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-divider" />

      <p className="sidebar-section-label">Account</p>
      <nav className="nav-list nav-list-compact" aria-label="Account navigation">
        {accountSidebarItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link nav-link-active" : "nav-link"}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {item.label === "Notifikarlar" ? <span className="sidebar-badge">2</span> : null}
              {item.label === "API Keys" ? <MoreHorizontal className="sidebar-row-dots" size={18} /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80"
          alt="Özgür"
        />
        <div className="sidebar-user-text">
          <strong>Özgür</strong>
          <span>ozgur@example.com</span>
        </div>
        <MoreHorizontal size={18} />
      </div>
    </aside>
  );
}
