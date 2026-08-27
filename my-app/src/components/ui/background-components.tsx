import { cn } from "@/lib/utils";

type SiteBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteBackground({ children, className }: SiteBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full bg-white", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right,rgb(237, 237, 237) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(237, 237, 237) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}
