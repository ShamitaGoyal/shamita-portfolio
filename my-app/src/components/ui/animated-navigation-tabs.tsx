"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type NavigationTabItem = {
  id: number;
  tile: string;
  link: string;
};

type AnimatedNavigationTabsProps = {
  items: NavigationTabItem[];
  className?: string;
};

function getHash(link: string): string | null {
  const hashIndex = link.indexOf("#");
  if (hashIndex === -1) return null;
  return link.slice(hashIndex);
}

function getPath(link: string): string {
  const hashIndex = link.indexOf("#");
  return hashIndex === -1 ? link : link.slice(0, hashIndex) || "/";
}

function resolveActiveItem(
  items: NavigationTabItem[],
  pathname: string,
  hash: string,
): NavigationTabItem {
  const hashMatch = items.find((item) => {
    const itemHash = getHash(item.link);
    const itemPath = getPath(item.link);
    return itemHash && itemPath === pathname && itemHash === hash;
  });
  if (hashMatch) return hashMatch;

  const pathMatch = items.find((item) => getPath(item.link) === pathname && !getHash(item.link));
  if (pathMatch) return pathMatch;

  const routeMatch = items.find((item) => item.link === pathname);
  if (routeMatch) return routeMatch;

  return items[0];
}

function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function AnimatedNavigationTabs({
  items,
  className,
}: AnimatedNavigationTabsProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [active, setActive] = useState<NavigationTabItem>(() => items[0]);
  const [isHover, setIsHover] = useState<NavigationTabItem | null>(null);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    setActive(resolveActiveItem(items, pathname, hash));
  }, [pathname, hash, items]);

  const handleClick = useCallback(
    (item: NavigationTabItem, event: React.MouseEvent<HTMLAnchorElement>) => {
      const itemHash = getHash(item.link);
      const itemPath = getPath(item.link);

      if (itemHash && itemPath === pathname) {
        event.preventDefault();
        window.history.pushState(null, "", itemHash);
        setHash(itemHash);
        setActive(item);
        scrollToSection(itemHash);
        return;
      }

      setActive(item);
    },
    [pathname],
  );

  return (
    <div className={cn("relative", className)}>
      <ul className="flex items-center justify-cente text-[1.25rem]">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.link}
              className={cn(
                "relative block py-2 transition-colors duration-300 hover:!text-primary",
                active.id === item.id
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
              onClick={(event) => handleClick(item, event)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <div className="relative px-5 py-2">
                {item.tile}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 h-full w-full bg-primary/10"
                    style={{ borderRadius: 6 }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 w-full bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 h-0.5 w-full bg-primary"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
