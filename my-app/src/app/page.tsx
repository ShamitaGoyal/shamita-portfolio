"use client";

import Image from "next/image";
import { ContactCardFooter } from "@/components/contact-card-footer";
import { FluidTooltip } from "@/components/fluid-tooltip";
import AnimatedHighlightText, {
  HeartIcon,
  Highlight,
  MousePointerClickIcon,
  SparklesIcon,
} from "@/components/ui/animated-highlight-text";

import { ProjectsFolderDesktop } from "@/components/projects-folder-desktop";

const UNSPLASH = {
  built:
    "/built-hero.png",
  loved:
    "/team-hero.jpg",
  polished:
    "/polished-hero.png",
} as const;

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center px-8 mt-[-6rem]">
        <FluidTooltip
          className="mb-6"
          text="smiski says hi >.< freshly graduated and ready to build!"
        >
          <Image
            src="/smiski-grad.png"
            alt="Smiski Grad"
            width={100}
            height={100}
            className="object-contain"
          />
        </FluidTooltip>
        <AnimatedHighlightText className="text-center">
          Hi! I'm Shamita. I design and build intuitive{" "}
          <Highlight
            icon={<MousePointerClickIcon />}
            image={UNSPLASH.built}
            color="#5b91c7"
            imageAlt="Built — developer workspace"
          >
            interfaces
          </Highlight>
          , work alongside thoughtful{" "}
          <Highlight
            icon={<HeartIcon />}
            color="#ef4444"
            image={UNSPLASH.loved}
            imageAlt="Loved — laptop and coffee"
          >
            teams
          </Highlight>
          , and sip{" "}
          <Highlight
            icon={<SparklesIcon />}
            color="#54b06d"
            image={UNSPLASH.polished}
            imageAlt="Polished — design workspace"
          >
            matcha
          </Highlight>{" "}
          on the side.
        </AnimatedHighlightText>
      </div>

      <ProjectsFolderDesktop />
      <ContactCardFooter />
    </main>
  );
}
