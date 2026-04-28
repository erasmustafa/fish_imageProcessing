import type { ReactNode } from "react";
import PlatformLayoutShell from "../../components/platform/shell/platform-layout-shell";

export default function PlatformLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PlatformLayoutShell>{children}</PlatformLayoutShell>;
}
