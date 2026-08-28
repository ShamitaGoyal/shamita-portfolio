"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  AnimatedNavigationTabs,
  type NavigationTabItem,
} from "@/components/ui/animated-navigation-tabs";

export const NAV_ITEMS: NavigationTabItem[] = [
  { id: 1, tile: "Home", link: "/" },
  { id: 2, tile: "Work", link: "/#projects" },
  { id: 3, tile: "About", link: "/#about" },
  { id: 4, tile: "Contact", link: "/#contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-white backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 p-5.5 text-3xl"
          aria-label="Home"
        >
          sg
        </Link>

        <div className="flex justify-center max-[486px]:hidden">
          <AnimatedNavigationTabs items={NAV_ITEMS} />
        </div>

        <motion.button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          whileHover={{ scale: 1.15, rotate: menuOpen ? -8 : 8 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="hidden p-5.5 max-[486px]:block"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                className="block"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                className="block"
                initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Menu className="size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div aria-hidden="true" className="max-[486px]:hidden" />
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="hidden overflow-hidden border-t border-border/40 bg-white max-[486px]:block"
          >
            <ul className="flex flex-col items-center gap-1 py-4 text-lg">
              {NAV_ITEMS.map((item, index) => (
                <motion.li
                  key={item.id}
                  className="w-full text-center"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.22,
                    delay: menuOpen ? index * 0.05 : 0,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.link}
                    className="block py-3 text-muted-foreground transition-colors duration-300 hover:text-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.tile}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
