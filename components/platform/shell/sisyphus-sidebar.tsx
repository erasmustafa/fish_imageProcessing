"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BarChart3,
  Globe,
  Home,
  LogOut,
  Map,
  Settings,
  Shield,
  Users,
} from "lucide-react";

const menuItems = [
  { href: "/platform/dashboard", label: "Home", icon: Home, match: ["/platform", "/platform/dashboard"] },
  { href: "/platform/profile", label: "Overview", icon: BarChart3 },
  { href: "/platform/analyze", label: "Analyse", icon: Shield },
  { href: "/platform/map", label: "Harita", icon: Map },
  { href: "/platform/library", label: "Domains", icon: Globe },
  { href: "/platform/social", label: "Social Area", icon: Users },
];

export default function SisyphusSidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [profileDarkTheme, setProfileDarkTheme] = useState(false);

  useEffect(() => {
    setPortalReady(true);
    const savedTheme = window.localStorage.getItem("aquascope-profile-theme");
    const shouldUseDark = savedTheme === "dark";
    setProfileDarkTheme(shouldUseDark);
    document.body.classList.toggle("profile-dark-theme", shouldUseDark);
  }, []);

  function toggleProfileTheme() {
    setProfileDarkTheme((current) => {
      const next = !current;
      document.body.classList.toggle("profile-dark-theme", next);
      window.localStorage.setItem("aquascope-profile-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <aside className="sidebar sisyphus-sidebar aqua-sidebar">
      <div className="aqua-sidebar__top">
        <div className="aqua-sidebar__brand-row">
          <Link href="/" className="aqua-sidebar__brand">
            <span className="aqua-sidebar__logo" aria-hidden>
              <img src="/aquascope-logo.svg" alt="" />
            </span>
            <span>AquaScope</span>
          </Link>
          <button
            className={profileDarkTheme ? "aqua-sidebar__theme aqua-sidebar__theme--active" : "aqua-sidebar__theme"}
            type="button"
            aria-label="Toggle user profile dark theme"
            aria-pressed={profileDarkTheme}
            onClick={toggleProfileTheme}
          >
            <span />
          </button>
        </div>
      </div>

      <nav className="aqua-sidebar__nav" aria-label="Sidebar navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.match
            ? item.match.some((match) => pathname === match || pathname.startsWith(`${match}/`))
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={active ? "aqua-sidebar__link aqua-sidebar__link--active" : "aqua-sidebar__link"}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="aqua-sidebar__footer">
        <button className="aqua-sidebar__logout" type="button" onClick={() => setShowLogoutModal(true)}>
          <LogOut size={16} />
          <span>Log out</span>
        </button>

        <Link href="/platform/profile" className="aqua-sidebar__user">
          <div className="aqua-sidebar__avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80"
              alt="Alicia Vikander"
            />
            <span className="aqua-sidebar__status" aria-hidden />
          </div>
          <div className="aqua-sidebar__user-text">
            <strong>Alicia</strong>
            <span>user@mail.com</span>
          </div>
          <Settings size={16} />
        </Link>
      </div>

      {showLogoutModal && portalReady ? createPortal(
        <div className="logout-modal-layer" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
          <div className="logout-modal-card">
            <span className="logout-modal-icon" aria-hidden>
              <LogOut size={22} />
            </span>
            <h2 id="logout-modal-title">Çıkış yapmak istediğinize emin misiniz?</h2>
            <p>Oturumunuz kapatılacak ve giriş ekranına yönlendirileceksiniz.</p>
            <div className="logout-modal-actions">
              <button className="logout-stay-button" type="button" onClick={() => setShowLogoutModal(false)}>
                Sayfada Kal
              </button>
              <Link className="logout-confirm-button" href="/">
                Çıkış
              </Link>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </aside>
  );
}
