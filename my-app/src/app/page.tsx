"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedNavigationTabs } from "@/components/ui/animated-navigation-tabs";
import AnimatedHighlightText, {
  HeartIcon,
  Highlight,
  MousePointerClickIcon,
  SparklesIcon,
} from "@/components/ui/animated-highlight-text";

import Work from "@/app/work/page"
const NAV_ITEMS = [
  { id: 1, tile: "Home", link: "/" },
  { id: 2, tile: "Work", link: "/work" },
  { id: 3, tile: "About", link: "#about" },
  { id: 4, tile: "Contact", link: "#contact" },
] as const;

const UNSPLASH = {
  built:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
  loved:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
  polished:
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop",
} as const;

export default function Home() {
  return (
    <main className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-50 p-3">
        <div className="grid h-14 grid-cols-3 items-center">
          <Link href="/" className="justify-start w-fit mt-[-0.25rem]" aria-label="Home">
            <Image
              src="/p-l.png"
              alt="Shamita"
              width={100}
              height={100}
              className="size-20 object-contain"
              priority
            />
          </Link>
          <div className="flex justify-center">
            <AnimatedNavigationTabs items={[...NAV_ITEMS]} />
          </div>
          <div aria-hidden="true" />
        </div>
      </header>

      <div className="flex min-h-[420px] w-full min-h-screen flex-1 items-center justify-center">
        <AnimatedHighlightText className="text-center mt-[-2rem]">
          Hi! I'm Shamita. I design and build intuitive{" "}
          <Highlight
            icon={<MousePointerClickIcon />}
            image={UNSPLASH.built}
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
          , and create{" "}
          <Highlight
            icon={<SparklesIcon />}
            image={UNSPLASH.polished}
            imageAlt="Polished — design workspace"
          >
            videos
          </Highlight>{" "}
          on the side.
        </AnimatedHighlightText>
      </div>

      <div>
        <Work/>
      </div>
    </main>
  );
}
