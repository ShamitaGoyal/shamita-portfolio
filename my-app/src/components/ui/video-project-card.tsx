"use client";

import { ProjectHoverPreview } from "@/components/ui/project-hover-preview";
import {
  PROJECT_CARD_MEDIA,
  PROJECT_CARD_SHELL,
} from "@/components/ui/project-card-shell";
import type { VideoProjectEntry } from "@/data/project-folders";

export function VideoProjectCard({
  title,
  projectRole,
  description,
  year,
  tags,
  href,
  src,
}: VideoProjectEntry) {
  const card = (
    <div className={PROJECT_CARD_SHELL}>
      <div className={PROJECT_CARD_MEDIA}>
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <ProjectHoverPreview
          title={title}
          projectRole={projectRole}
          description={description}
          year={year}
          tags={tags}
          href={href}
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {card}
      </a>
    );
  }

  return card;
}
