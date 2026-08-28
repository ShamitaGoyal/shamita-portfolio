"use client";

import { ChevronLeft, ChevronRight, MoreVertical, Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BrowserWindowCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  url?: string;
};

export function BrowserWindowCard({
  title,
  children,
  className,
  url,
}: BrowserWindowCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "group overflow-hidden rounded-2xl border border-[#d9d9d9] bg-[#ececec] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#dddddd] px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>

        <div className="flex items-center gap-1">
          <span className="flex size-6 items-center justify-center rounded-full bg-[#f7f7f7] text-[#a8a8a8]">
            <ChevronLeft className="size-3.5" strokeWidth={2.25} />
          </span>
          <span className="flex size-6 items-center justify-center rounded-full bg-[#f7f7f7] text-[#a8a8a8]">
            <ChevronRight className="size-3.5" strokeWidth={2.25} />
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-white px-3 py-1.5">
          <span className="truncate text-xs text-[#9a9a9a]">
            {url ?? title.toLowerCase().replace(/\s+/g, "-")}
          </span>
          <Search className="size-3.5 shrink-0 text-[#b0b0b0]" strokeWidth={2.25} />
        </div>

        <MoreVertical className="size-4 shrink-0 text-[#a8a8a8]" strokeWidth={2.25} />
      </div>

      <div className="overflow-hidden bg-white">{children}</div>
    </motion.article>
  );
}
