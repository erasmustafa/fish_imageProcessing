import type { ReactNode } from "react";
import MobilePlatformNav from "./mobile-platform-nav";
import SisyphusSidebar from "./sisyphus-sidebar";

export default function PlatformLayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <SisyphusSidebar />
      <div>
        <MobilePlatformNav />
        <main className="platform-main">{children}</main>
      </div>
    </div>
  );
}
