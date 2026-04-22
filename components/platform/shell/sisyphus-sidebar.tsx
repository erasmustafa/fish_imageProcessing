"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Home,
  FileText,
  BarChart3,
  Shield,
  Flag,
  Globe2,
  Users,
  LogOut,
  Settings,
  ChevronDown,
  ChevronsLeft,
} from "lucide-react";

const menuTop = [
  { href: "/platform/dashboard", label: "Home", icon: Home, matches: ["/platform", "/platform/dashboard"] },
  { href: "/platform/social", label: "Reports", icon: FileText, dot: true },
];

const organisationMenu = [
  { href: "/platform/profile", label: "Overview", icon: BarChart3 },
  { href: "/platform/analyze", label: "Analyse", icon: Shield, plus: true },
  { href: "/platform/map", label: "Harita", icon: Flag, plus: true },
  { href: "/platform/library", label: "Domains", icon: Globe2, plus: true },
  { href: "/platform/social", label: "Social Area", icon: Users, plus: true },
];

export default function SisyphusSidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setPortalReady(true);
    const savedState = window.localStorage.getItem("aquascope-sidebar-collapsed");
    const shouldCollapse = savedState === "true";
    setCollapsed(shouldCollapse);
    document.body.classList.toggle("sidebar-collapsed", shouldCollapse);
  }, []);

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      document.body.classList.toggle("sidebar-collapsed", next);
      window.localStorage.setItem("aquascope-sidebar-collapsed", String(next));
      return next;
    });
  }

  return (
    <aside className={collapsed ? "sidebar sisyphus-sidebar aqua-sidebar aqua-sidebar--collapsed" : "sidebar sisyphus-sidebar aqua-sidebar"}>
      <div className="aqua-sidebar__panel">
        <div className="aqua-sidebar__header">
          <div className="aqua-sidebar__brand-wrap">
            <div className="aqua-sidebar__logo-box">
              <img src="/aquascope-logo.svg" alt="" className="aqua-sidebar__logo-image" />
            </div>

            <div className="aqua-sidebar__brand-copy">
              <h1>AQUASCOPE</h1>
              <p>Sisyphus</p>
            </div>
          </div>

          <button
            className={collapsed ? "aqua-sidebar__theme aqua-sidebar__theme--active" : "aqua-sidebar__theme"}
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            onClick={toggleSidebar}
          >
            <ChevronsLeft size={20} />
          </button>
        </div>

        <nav className="aqua-sidebar__menu aqua-sidebar__menu--top" aria-label="Primary navigation">
          {menuTop.map((item) => {
            const active = item.matches
              ? item.matches.some((match) => pathname === match || pathname.startsWith(`${match}/`))
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <SidebarItem key={item.label} {...item} active={active} />;
          })}
        </nav>

        <div className="aqua-sidebar__section">
          <SectionTitle title="ORGANISATION" />

          <div className="aqua-sidebar__menu aqua-sidebar__menu--org">
            {organisationMenu.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return <SidebarItem key={item.label} {...item} active={active} />;
            })}
          </div>
        </div>

        <div className="aqua-sidebar__collapsed">
          <SectionTitle title="VENDORS" />
          <SectionTitle title="MANAGED SERVICE" />
        </div>

        <div className="aqua-sidebar__spacer" />

        <button className="aqua-sidebar__logout" type="button" onClick={() => setShowLogoutModal(true)}>
          <LogOut size={20} className="aqua-sidebar__logout-icon" />
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
            <strong>Alicia Vikander</strong>
            <span>alicia@sisyphus.com</span>
          </div>

          <span className="aqua-sidebar__settings" aria-hidden>
            <Settings size={18} />
          </span>
        </Link>
      </div>

      {showLogoutModal && portalReady
        ? createPortal(
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
          )
        : null}
    </aside>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  dot?: boolean;
  plus?: boolean;
};

function SidebarItem({ href, label, icon: Icon, active, dot, plus }: SidebarItemProps) {
  return (
    <Link href={href} className={active ? "aqua-sidebar__item aqua-sidebar__item--active" : "aqua-sidebar__item"}>
      <Icon
        size={22}
        className={active ? "aqua-sidebar__item-icon aqua-sidebar__item-icon--active" : "aqua-sidebar__item-icon"}
      />

      <span className="aqua-sidebar__item-label">{label}</span>

      {dot ? <span className="aqua-sidebar__item-dot" /> : null}
      {plus ? <span className="aqua-sidebar__item-plus">+</span> : null}
    </Link>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="aqua-sidebar__section-title">
      <h2>{title}</h2>
      <ChevronDown size={16} />
    </div>
  );
}
