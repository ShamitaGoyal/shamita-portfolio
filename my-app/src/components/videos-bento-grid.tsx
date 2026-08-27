"use client";

import { cn } from "@/lib/utils";
import { VideoProjectCard } from "@/components/ui/video-project-card";
import { PROJECT_FOLDERS } from "@/data/project-folders";

type VideosBentoGridProps = {
  className?: string;
};

export function VideosBentoGrid({ className }: VideosBentoGridProps) {
  const videos = PROJECT_FOLDERS.flatMap((folder) =>
    folder.projects.filter((project) => project.type === "video"),
  );

  return (
    <section className={cn("w-full px-8 py-20", className)}>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2">
        {videos.map((video) => (
          <VideoProjectCard key={video.id} {...video} />
        ))}
      </div>
    </section>
  );
}
