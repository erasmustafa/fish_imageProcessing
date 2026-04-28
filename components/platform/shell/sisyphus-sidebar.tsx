"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BarChart3,
  ChevronDown,
  FileText,
  Flag,
  Globe2,
  Home,
  LogOut,
  Plus,
  Settings,
  Shield,
  ShieldAlert,
} from "lucide-react";

const primaryItems = [
  { href: "/platform/dashboard", label: "Home", icon: Home },
  { href: "/platform/social", label: "Reports", icon: FileText, dot: true },
];

const organisationItems = [
  { href: "/platform/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/platform/analyze", label: "Analyse", icon: Shield, action: true },
  { href: "/platform/map", label: "Harita", icon: Flag, action: true },
  { href: "/platform/library", label: "Domains", icon: Globe2, action: true },
  { href: "/platform/social", label: "Social Area", icon: ShieldAlert },
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
    <aside className="sidebar sisyphus-sidebar">
      <div className="sisyphus-head">
        <Link href="/" className="sisyphus-brand">
          <span className="sisyphus-logo" aria-hidden />
          <span>Sisyphus</span>
        </Link>
        <button
          className={profileDarkTheme ? "sisyphus-toggle sisyphus-toggle-active" : "sisyphus-toggle"}
          type="button"
          aria-label="Toggle user profile dark theme"
          aria-pressed={profileDarkTheme}
          onClick={toggleProfileTheme}
        >
          <span />
        </button>
      </div>

      <nav className="sisyphus-nav sisyphus-primary-nav" aria-label="Primary navigation">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "sisyphus-link sisyphus-link-active" : "sisyphus-link"}
            >
              <Icon size={15} />
              <span>{item.label}</span>
              {item.dot ? <span className="sisyphus-dot" /> : null}
            </Link>
          );
        })}
      </nav>

      <section className="sisyphus-section">
        <button className="sisyphus-section-title" type="button">
          <span>Organisation</span>
          <ChevronDown size={12} />
        </button>

        <nav className="sisyphus-nav" aria-label="Organisation navigation">
          {organisationItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "sisyphus-link sisyphus-link-active" : "sisyphus-link"}
              >
                <Icon size={15} />
                <span>{item.label}</span>
                {item.action ? <Plus className="sisyphus-plus" size={13} /> : null}
              </Link>
            );
          })}
        </nav>
      </section>

      <button className="sisyphus-collapsed-section" type="button">
        <span>Vendors</span>
        <ChevronDown size={12} />
      </button>

      <button className="sisyphus-collapsed-section" type="button">
        <span>Managed Service</span>
        <ChevronDown size={12} />
      </button>

      <button className="sisyphus-logout" type="button" onClick={() => setShowLogoutModal(true)}>
        <LogOut size={15} />
        <span>Log out</span>
      </button>

      <Link href="/platform/profile" className="sisyphus-user">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80"
          alt="Alicia Vikander"
        />
        <span className="sisyphus-user-status" aria-hidden />
        <div className="sisyphus-user-text">
          <strong>Alicia Vikander</strong>
          <span>alicia@sisyphus.com</span>
        </div>
        <Settings size={14} />
      </Link>

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
