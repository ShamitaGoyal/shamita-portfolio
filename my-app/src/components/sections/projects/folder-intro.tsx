import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FolderIntroProps = {
  title: ReactNode;
  summary: ReactNode;
  projectRole?: string;
  date?: string;
  className?: string;
};

export function FolderIntro({
  title,
  summary,
  projectRole,
  date,
  className,
}: FolderIntroProps) {
  return (
    <header
      className={cn(
        "border-b border-border/60 bg-white px-6 py-8 sm:px-8",
        className,
      )}
    >
      {projectRole ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {projectRole}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {date ? (
          <span className="text-sm font-medium text-muted-foreground">
            {date}
          </span>
        ) : null}
      </div>
      <div className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {summary}
      </div>
    </header>
  );
}
