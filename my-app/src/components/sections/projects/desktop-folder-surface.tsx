"use client";

import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Grid3X3,
  HardDrive,
  LayoutGrid,
  Search,
  Share,
  Tag,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FluidTooltip } from "@/components/ui/fluid-tooltip";
import { cn } from "@/lib/utils";
import { FolderIcon } from "@/components/sections/projects/folder-icon";
import type { ProjectFolder } from "@/data/project-folders";

type FolderPosition = { x: number; y: number };

/** Matches FolderIcon outer size (w-40 + padding + label). */
const FOLDER_WIDTH = 160;
const FOLDER_HEIGHT = 168;

const INITIAL_POSITIONS: Record<string, FolderPosition> = {
  labs: { x: 55, y: 36 },
  "design-co": { x: 350, y: 36 },
  "data-science": { x: 28, y: 200 },
  personal: { x: 270, y: 200 },
};

type DesktopFolderSurfaceProps = {
  folders: ProjectFolder[];
  onOpenFolder: (folderId: string) => void;
  className?: string;
};

function clampPosition(
  x: number,
  y: number,
  maxX: number,
  maxY: number,
): FolderPosition {
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(0, Math.min(y, maxY)),
  };
}

export function DesktopFolderSurface({
  folders,
  onOpenFolder,
  className,
}: DesktopFolderSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const suppressClickRef = useRef(false);
  const [surfaceSize, setSurfaceSize] = useState({ width: 0, height: 0 });
  const [positions, setPositions] = useState<Record<string, FolderPosition>>(
    () =>
      folders.reduce<Record<string, FolderPosition>>((acc, folder) => {
        acc[folder.id] = INITIAL_POSITIONS[folder.id] ?? { x: 28, y: 36 };
        return acc;
      }, {}),
  );

  const maxX = Math.max(0, surfaceSize.width - FOLDER_WIDTH);
  const maxY = Math.max(0, surfaceSize.height - FOLDER_HEIGHT);

  const clampAll = useCallback(
    (next: Record<string, FolderPosition>) => {
      if (maxX === 0 && maxY === 0) return next;
      return Object.fromEntries(
        Object.entries(next).map(([id, pos]) => [
          id,
          clampPosition(pos.x, pos.y, maxX, maxY),
        ]),
      );
    },
    [maxX, maxY],
  );

  useLayoutEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    const updateSize = () => {
      setSurfaceSize({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (maxX === 0 && maxY === 0) return;
    setPositions((prev) => clampAll(prev));
  }, [maxX, maxY, clampAll]);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-[#d4d4d4] bg-[#f5f5f7] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-[#dddddd] bg-[#ececec]/95 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
         {/* //buttons of the finder window */}
        <div className="hidden items-center gap-1 sm:flex">
          <span className="flex size-7 items-center justify-center rounded-md bg-white/70 text-[#888]">
            <ChevronLeft className="size-4" />
          </span>
          <span className="flex size-7 items-center justify-center rounded-md bg-white/70 text-[#888]">
            <ChevronRight className="size-4" />
          </span>
        </div>

        {/* //title of the finder window */}
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <span className="truncate text-sm font-medium text-[#333]">
            Desktop
          </span>
        </div>

        {/* //search bar of the finder window */}

        <div className="hidden items-center gap-1 text-[#888] sm:flex">
          <LayoutGrid className="size-4" />
          <Grid3X3 className="size-4" />
          <Share className="size-4" />
          <Tag className="size-4" />
          <Ellipsis className="size-4" />
          <Search className="size-4" />
        </div>
      </div>

      {/* //surface of the finder window */}
      <div
        ref={surfaceRef}
        className="relative min-h-[360px] bg-[#ececee] sm:min-h-[420px]"
      >
        {/* <FluidTooltip
          text="pssst...you can drag around the folders too"
          side="top"
          offset={8}
          className="absolute right-2 top-0 z-10 -translate-y-[calc(100%-8px)] sm:right-[-50px] sm:top-[150px] sm:translate-y-0"
        > */}
          {/* <Image
            src="/images/smiski-head.png"
            alt="Smiski perched on the folder desktop"
            width={160}
            height={160}
            className="h-auto w-[min(128px,26vw)] object-contain sm:w-[300px] bg-green-500 "
          /> */}
        {/* </FluidTooltip> */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative min-h-[360px] sm:min-h-[420px]">
          {folders.map((folder) => {
            const position = positions[folder.id] ?? { x: 28, y: 36 };

            return (
              <motion.div
                key={folder.id}
                drag
                dragConstraints={{
                  left: 0,
                  top: 0,
                  right: maxX,
                  bottom: maxY,
                }}
                dragElastic={0}
                dragMomentum={false}
                whileDrag={{ scale: 1.04, zIndex: 20 }}
                className="absolute cursor-grab touch-none active:cursor-grabbing"
                style={{ left: 0, top: 0, width: FOLDER_WIDTH }}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                onDragStart={() => {
                  suppressClickRef.current = false;
                }}
                onDrag={(_, info) => {
                  if (Math.abs(info.delta.x) > 2 || Math.abs(info.delta.y) > 2) {
                    suppressClickRef.current = true;
                  }
                }}
                onDragEnd={(_, info) => {
                  const moved = Math.hypot(info.offset.x, info.offset.y);
                  setPositions((prev) => {
                    const current = prev[folder.id] ?? { x: 0, y: 0 };
                    const next = clampPosition(
                      current.x + info.offset.x,
                      current.y + info.offset.y,
                      maxX,
                      maxY,
                    );
                    return { ...prev, [folder.id]: next };
                  });
                  if (moved < 6) {
                    onOpenFolder(folder.id);
                  }
                  window.setTimeout(() => {
                    suppressClickRef.current = false;
                  }, 0);
                }}
              >
                <FolderIcon
                  name={folder.name}
                  onOpen={() => {
                    if (!suppressClickRef.current) {
                      onOpenFolder(folder.id);
                    }
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-t border-[#e5e5e5] bg-[#fafafa] px-4 py-2 text-[0.7rem] text-[#666]">
        <HardDrive className="size-3.5 shrink-0" />
        <span className="truncate">
          Macintosh HD &gt; Users &gt; Shamita &gt; Desktop
        </span>
      </div>
    </div>
  );
}
