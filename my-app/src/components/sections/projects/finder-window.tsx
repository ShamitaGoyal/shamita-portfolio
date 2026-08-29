"use client";

import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Folder,
  Grid3X3,
  HardDrive,
  LayoutGrid,
  Search,
  Share,
  Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FolderIntro } from "@/components/sections/projects/folder-intro";
import { ProjectCard } from "@/components/sections/projects/project-card";
import { VideoProjectCard } from "@/components/sections/projects/video-project-card";
import {
  PROJECT_FOLDERS,
  type ProjectEntry,
  type ProjectFolder,
} from "@/data/project-folders";

type FinderWindowProps = {
  folder: ProjectFolder;
  open: boolean;
  onClose: () => void;
  onSelectFolder: (folderId: string) => void;
};

function ProjectEntryCard({ project }: { project: ProjectEntry }) {
  if (project.type === "video") {
    return <VideoProjectCard {...project} />;
  }

  return (
    <ProjectCard
      title={project.title}
      projectRole={project.projectRole}
      description={project.description}
      year={project.year}
      tags={project.tags}
      href={project.href}
      imageUrl={project.imageUrl}
      imageAlt={project.imageAlt}
    />
  );
}

export function FinderWindow({
  folder,
  open,
  onClose,
  onSelectFolder,
}: FinderWindowProps) {
  const folderIndex = PROJECT_FOLDERS.findIndex((item) => item.id === folder.id);
  const prevFolder = PROJECT_FOLDERS[folderIndex - 1];
  const nextFolder = PROJECT_FOLDERS[folderIndex + 1];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close folder window"
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${folder.name} projects`}
            className="relative flex h-[min(82vh,760px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#d4d4d4] bg-[#f5f5f7] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#dddddd] bg-[#ececec]/95 px-4 py-2.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="size-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
                />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous folder"
                  disabled={!prevFolder}
                  onClick={() => prevFolder && onSelectFolder(prevFolder.id)}
                  className="flex size-7 items-center justify-center rounded-md bg-white/70 text-[#888] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next folder"
                  disabled={!nextFolder}
                  onClick={() => nextFolder && onSelectFolder(nextFolder.id)}
                  className="flex size-7 items-center justify-center rounded-md bg-white/70 text-[#888] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              <div className="flex min-w-0 flex-1 items-center justify-center">
                <label className="sr-only sm:hidden" htmlFor="finder-folder-select">
                  Select project folder
                </label>
                <select
                  id="finder-folder-select"
                  value={folder.id}
                  onChange={(event) => onSelectFolder(event.target.value)}
                  className="max-w-full truncate rounded-md border-none bg-transparent px-2 py-1 text-center text-sm font-medium text-[#333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007aff]/50 sm:hidden"
                >
                  {PROJECT_FOLDERS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="hidden truncate text-sm font-medium text-[#333] sm:block">
                  {folder.name}
                </span>
              </div>

              <div className="hidden items-center gap-1 text-[#888] sm:flex">
                <LayoutGrid className="size-4" />
                <Grid3X3 className="size-4" />
                <Share className="size-4" />
                <Tag className="size-4" />
                <Ellipsis className="size-4" />
                <Search className="size-4" />
              </div>
            </div>

            <div className="flex min-h-0 flex-1">
              <aside className="hidden w-44 shrink-0 border-r border-[#dddddd] bg-[#f3f3f3]/90 p-3 sm:block">
                <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#888]">
                  Favorites
                </p>
                <ul className="space-y-0.5">
                  {PROJECT_FOLDERS.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelectFolder(item.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                          item.id === folder.id
                            ? "bg-[#007aff]/12 text-[#007aff]"
                            : "text-[#444] hover:bg-black/[0.04]",
                        )}
                      >
                        <Folder className="size-4 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <FolderIntro
                    title={folder.intro.title}
                    summary={folder.intro.summary}
                    projectRole={folder.intro.projectRole}
                    date={
                      folder.intro.year !== undefined
                        ? String(folder.intro.year)
                        : undefined
                    }
                  />

                  {folder.sections ? (
                    folder.sections.map((section) => (
                      <section key={section.id}>
                        <FolderIntro
                          title={section.title}
                          date={section.date}
                          summary={section.summary}
                          projectRole={section.projectRole}
                          className="border-t border-b-0 bg-transparent px-6 pt-6 pb-0 sm:px-8"
                        />

                        <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2 sm:px-8">
                          {section.projects.map((project) => (
                            <ProjectEntryCard
                              key={
                                project.type === "video"
                                  ? project.id
                                  : project.title
                              }
                              project={project}
                            />
                          ))}
                        </div>
                      </section>
                    ))
                  ) : (
                    <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:grid-cols-2 sm:px-8">
                      {folder.projects.map((project) => (
                        <ProjectEntryCard
                          key={
                            project.type === "video"
                              ? project.id
                              : project.title
                          }
                          project={project}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 border-t border-[#e5e5e5] bg-[#fafafa] px-4 py-2 text-[0.7rem] text-[#666]">
                  <HardDrive className="size-3.5 shrink-0" />
                  <span className="truncate">
                    Macintosh HD &gt; Users &gt; Shamita &gt; Desktop &gt;{" "}
                    {folder.name}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
