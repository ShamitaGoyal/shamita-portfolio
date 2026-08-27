"use client";

import Link from "next/link";
import {
  AnimatedNavigationTabs,
  type NavigationTabItem,
} from "@/components/ui/animated-navigation-tabs";

export const NAV_ITEMS: NavigationTabItem[] = [
  { id: 1, tile: "Home", link: "/" },
  { id: 2, tile: "Work", link: "/#projects" },
  { id: 3, tile: "About", link: "/about" },
  { id: 4, tile: "Contact", link: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-white backdrop-blur-sm">
      <div className="grid h-14 grid-cols-3 items-center">
        <Link href="/" className="pl-10 text-3xl" aria-label="Home">
          sg
        </Link>
        <div className="flex justify-center">
          <AnimatedNavigationTabs items={NAV_ITEMS} />
        </div>
        <div aria-hidden="true" />
      </div>
    </header>
  );
}
