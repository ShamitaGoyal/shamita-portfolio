"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the props for the component
interface ProjectCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  imageUrl: string;
  title: string;
  description: string;
  year: string | number;
  tags?: readonly string[];
  href?: string;
  imageAlt?: string;
}

// Animation variants for Framer Motion
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

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
} satisfies Variants;

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      description,
      year,
      tags = [],
      href,
      imageAlt = "Project Image",
      ...props
    },
    ref
  ) => {
    const card = (
      <motion.div
        ref={ref}
        className={cn(
          "group w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        // whileHover={{ scale: 1.02, y: -5 }}
        {...props}
      >
        {/* Image Section */}
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-60 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <motion.h3
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-lg font-semibold tracking-tight"
            >
              {title}
            </motion.h3>
            {href && (
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            )}
          </div>

          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-sm text-muted-foreground"
          >
            {description}
          </motion.p>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-1.5"
            >
              <Calendar className="h-4 w-4" />
              <span>{year}</span>
            </motion.div>
            {tags.length > 0 && (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-1.5"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {card}
        </a>
      );
    }

    return card;
  }
);

ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
export type { ProjectCardProps };
