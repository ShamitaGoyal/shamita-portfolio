import Image from "next/image";
import { LiveClock } from "@/components/live-clock";
import { BrowserWindowCard } from "@/components/ui/browser-window-card";
import { cn } from "@/lib/utils";

type ContactCardFooterProps = {
  className?: string;
};

function CardField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 border-b border-foreground/30 pb-0.5 font-[family-name:var(--font-mondwest)] text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <div className="font-[family-name:var(--font-mondwest)] text-sm tracking-wide text-foreground sm:text-base">
        {children}
      </div>
    </div>
  );
}

export function ContactCardFooter({ className }: ContactCardFooterProps) {
  return (
    <footer
      id="contact"
      className={cn("scroll-mt-20 w-full px-8 py-20", className)}
    >
      <div className="mx-auto max-w-5xl">
        <BrowserWindowCard title="Contact" url="shamita.dev/contact">
          <div className="px-6 py-8 text-foreground sm:px-10 sm:py-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 className="font-[family-name:var(--font-mondwest)] text-3xl uppercase tracking-tight sm:text-4xl md:text-5xl">
                Shamita Goyal
              </h2>
              <p className="shrink-0 text-right font-[family-name:var(--font-mondwest)] text-xs tracking-wide text-muted-foreground">
                <LiveClock />
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-[auto_1fr]">
              <div className="flex flex-col gap-6 sm:max-w-[120px]">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full border border-foreground/20 text-[8px] font-bold leading-none">
                    S
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-full border border-foreground/20 text-[8px] font-bold leading-none">
                    G
                  </div>
                </div>
                <div className="relative flex size-20 items-center justify-center">
                  <Image
                    src="/p-l.png"
                    alt="Shamita Goyal signature logo"
                    width={80}
                    height={80}
                    className="size-full object-contain"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <CardField label="LINKEDIN">
                  linkedin.com/in/shamita-goyal
                </CardField>
                <CardField label="CONTACT">
                  goyal.shamita@gmail.com
                </CardField>
                <CardField label="GITHUB">
                  github.com/ShamitaGoyal
                </CardField>
                <CardField label="RESUME">Link</CardField>
              </div>
            </div>
          </div>
        </BrowserWindowCard>
      </div>
    </footer>
  );
}
