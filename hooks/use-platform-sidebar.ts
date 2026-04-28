"use client";

import { useState } from "react";

export function usePlatformSidebar() {
  const [open, setOpen] = useState(false);

  return {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen((value) => !value),
  };
}
