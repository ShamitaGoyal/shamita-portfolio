"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type FolderIconProps = {
  name: string;
  onOpen: () => void;
  className?: string;
};

export function FolderIcon({ name, onOpen, className }: FolderIconProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onDoubleClick={onOpen}
      className={cn(
        "group flex w-40 flex-col items-center gap-3 rounded-lg p-3 text-center transition-colors hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        className,
      )}
    >
      <Image
        src="/images/folder.png"
        alt=""
        width={120}
        height={96}
        className="size-24 object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        draggable={false}
      />
      <span className="line-clamp-2 text-base font-medium leading-tight text-foreground">
        {name}
      </span>
    </button>
  );
}
