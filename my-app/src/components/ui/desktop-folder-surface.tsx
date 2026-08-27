"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FolderIcon } from "@/components/ui/folder-icon";
import type { ProjectFolder } from "@/data/project-folders";

type FolderPosition = { x: number; y: number };

/** Matches FolderIcon outer size (w-40 + padding + label). */
const FOLDER_WIDTH = 160;
const FOLDER_HEIGHT = 168;

const INITIAL_POSITIONS: Record<string, FolderPosition> = {
  labs: { x: 28, y: 36 },
  "design-co": { x: 210, y: 36 },
  "data-science": { x: 28, y: 200 },
  personal: { x: 210, y: 200 },
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
    <div className={cn("relative", className)}>
      <div
        ref={surfaceRef}
        className="relative min-h-[360px] rounded-2xl sm:min-h-[420px]"
      >
        <Image
          src="/smiski-head.png"
          alt=""
          width={160}
          height={160}
          aria-hidden
          className="pointer-events-none absolute right-2 top-0 z-10 h-auto w-[min(128px,26vw)] -translate-y-[calc(100%-8px)] object-contain sm:right-[-50] top-[150] sm:w-[300px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border border-[#d8d8de] bg-[#ececee] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_10px_30px_-18px_rgba(0,0,0,0.18)]"
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
    </div>
  );
}
