import { cn } from "@/lib/utils";

type FolderIntroProps = {
  title: string;
  summary: string;
  projectRole?: string;
  className?: string;
};

export function FolderIntro({
  title,
  summary,
  projectRole,
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
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {summary}
      </p>
    </header>
  );
}
