"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

export function AnimatedNavigationTabs({
  items,
  className,
}: AnimatedNavigationTabsProps) {
  const pathname = usePathname();
  const [active, setActive] = useState<NavigationTabItem>(
    () => items.find((item) => item.link === pathname) ?? items[0],
  );
  const [isHover, setIsHover] = useState<NavigationTabItem | null>(null);

  useEffect(() => {
    const matched = items.find((item) => item.link === pathname);
    if (matched) {
      setActive(matched);
    }
  }, [pathname, items]);

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
              onClick={() => setActive(item)}
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
