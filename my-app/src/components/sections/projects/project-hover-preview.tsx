import { ArrowUpRight, Calendar } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProjectPreviewFields = {
  title: string;
  projectRole?: string;
  description: ReactNode;
  year: string | number;
  tags?: readonly string[];
  href?: string;
};

type ProjectHoverPreviewProps = ProjectPreviewFields & {
  className?: string;
};

export function ProjectHoverPreview({
  title,
  projectRole,
  description,
  year,
  tags = [],
  href,
  className,
}: ProjectHoverPreviewProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-black/45 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className,
      )}
    >
      <div className="translate-y-2 space-y-2 transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white/75">
              {projectRole}
            </p>
            <h3 className="text-lg font-semibold leading-tight text-white">
              {title}
            </h3>
          </div>
          {href ? (
            <ArrowUpRight className="size-4 shrink-0 text-white/70" />
          ) : null}
        </div>

        <div className="line-clamp-3 text-sm leading-relaxed text-white/95">
          {description}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <Calendar className="size-3.5" />
            <span>{year}</span>
          </div>
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[0.65rem] font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
