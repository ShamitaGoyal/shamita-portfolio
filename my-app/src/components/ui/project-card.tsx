"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ProjectHoverPreview,
  type ProjectPreviewFields,
} from "@/components/ui/project-hover-preview";
import {
  PROJECT_CARD_MEDIA,
  PROJECT_CARD_SHELL,
} from "@/components/ui/project-card-shell";

interface ProjectCardProps
  extends ProjectPreviewFields,
    Omit<
      React.ComponentPropsWithoutRef<typeof motion.div>,
      "children" | "title"
    > {
  imageUrl: string;
  imageAlt?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
} satisfies Variants;

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      projectRole,
      description,
      year,
      tags = [],
      href,
      imageAlt = "Project Image",
      ...props
    },
    ref,
  ) => {
    const card = (
      <motion.div
        ref={ref}
        className={cn(PROJECT_CARD_SHELL, className)}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        <div className={PROJECT_CARD_MEDIA}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
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
      </motion.div>
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
  },
);

ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
export type { ProjectCardProps };
