"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function HashScrollOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;
    scrollToHash(window.location.hash);
  }, [pathname]);

  return null;
}
