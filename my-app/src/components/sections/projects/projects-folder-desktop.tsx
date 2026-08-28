"use client";

import Image from "next/image";
import { useState } from "react";
import { FluidTooltip } from "@/components/ui/fluid-tooltip";
import { cn } from "@/lib/utils";
import { DesktopFolderSurface } from "@/components/sections/projects/desktop-folder-surface";
import { FinderWindow } from "@/components/sections/projects/finder-window";
import {
  PROJECT_FOLDERS,
  getProjectFolder,
} from "@/data/project-folders";

type ProjectsFolderDesktopProps = {
  className?: string;
  id?: string;
};

export function ProjectsFolderDesktop({
  className,
  id = "projects",
}: ProjectsFolderDesktopProps) {
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const openFolder = openFolderId ? getProjectFolder(openFolderId) : null;

  return (
    <section id={id} className={cn("scroll-mt-20 w-full px-8 py-20 ", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Projects
          </h2>
          <p className="mt-2 text-xl text-muted-foreground mt-3">
            Open a folder to explore work by organization.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="flex items-center justify-center lg:w-[42%] lg:-ml-6 lg:justify-end lg:pr-2">
            <FluidTooltip text="psssst...the folders are draggable! open a folder to see what I've built for each team.">
              <Image
                src="/images/smiski.png"
                alt="Smiski with laptop"
                width={360}
                height={360}
                className="animate-float1 h-auto w-[min(360px,44vw)] object-contain"
              />
            </FluidTooltip>
          </div>

          <div className="min-w-0 flex-1">
            <DesktopFolderSurface
              folders={PROJECT_FOLDERS}
              onOpenFolder={setOpenFolderId}
            />
          </div>
        </div>
      </div>

      {openFolder ? (
        <FinderWindow
          folder={openFolder}
          open={Boolean(openFolderId)}
          onClose={() => setOpenFolderId(null)}
          onSelectFolder={setOpenFolderId}
        />
      ) : null}
    </section>
  );
}
