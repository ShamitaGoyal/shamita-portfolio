"use client";

import Image from "next/image";
import { ContactCardFooter } from "@/components/sections/contact-card-footer";
import { FluidTooltip } from "@/components/ui/fluid-tooltip";
import AnimatedHighlightText, {
  HeartIcon,
  Highlight,
  MousePointerClickIcon,
  SparklesIcon,
} from "@/components/ui/animated-highlight-text";

import { AboutSection } from "@/components/sections/about-section";
import { ProjectsFolderDesktop } from "@/components/sections/projects/projects-folder-desktop";
import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";

const UNSPLASH = {
  built:
    "/images/built-hero.webp",
  loved:
    "/images/team-hero.webp",
  polished:
    "/images/polished-hero.webp",
} as const;

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <div className="relative flex min-h-screen w-full flex-1 flex-col items-center justify-center px-8 mt-[-6rem]">
        <BackgroundPixelStars className="pointer-events-none absolute inset-0 z-0" />

        <FluidTooltip
          className="relative z-10 mb-6"
          text="smiski says hi >.< freshly graduated and ready to build!"
        >
          <Image
            src="/images/smiski-grad.webp"
            alt="Smiski Grad"
            width={100}
            height={100}
            className="object-contain"
          />
        </FluidTooltip>
        <AnimatedHighlightText className="relative z-10 text-center">
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
      <AboutSection />
      <ContactCardFooter />
    </main>
  );
}
