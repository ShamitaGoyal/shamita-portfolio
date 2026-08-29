import Image from "next/image";
import { TypewriterText } from "@/components/ui/typewriter-text";

export function AboutSection() {
  return (
    <section id="about" className="flex min-h-full flex-1 flex-col px-8 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-13">
        <div className="relative lg:w-[90%] s-[-3rem] lg:ml-0">
          <Image
            src="/images/about-collage.webp"
            alt="Photo collage of Shamita"
            width={600}
            height={700}
            className="h-auto w-full object-contain"
            priority
          />
          <TypewriterText
            text="Yesterday is history, tomorrow is a mystery, today is a gift - that's why it's called the present."
            className="absolute top-[32%] left-[2%] max-w-[160px] text-[15px] leading-tight text-center font-[family-name:var(--font-jelek)] cursor-pointer max-[586px]:max-w-[110px] max-[586px]:text-[10px] max-[390px]:max-w-[80px] max-[390px]:text-[8px]
            max-[390px]:top-[28%] sm:max-w-[200px] sm:text-lg md:max-w-[200px] md:text-lg"
          />
          <p className="mt-[-1rem]">Life is a collection of beautiful, ordinary moments.</p>
        </div>

        <div className="lg:w-[55%]">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hi! I&apos;m Shamita ⊹ ࣪ ˖⏾⋆.˚
          </h1>

          <div className="mt-6 space-y-4 font-[family-name:var(--font-mondwest)] text-base leading-relaxed sm:text-lg">
            <p>
              I&apos;m a designer and developer who loves building products that
              feel thoughtful, polished, and easy to use. I care about the small
              details — from micro-interactions to typography — that make an
              experience feel alive.
            </p>
            <p>
              My work spans interface design, frontend development, and creative
              video projects. I enjoy collaborating with teams who value craft and
              user-centered thinking.
            </p>
            <p>
              When I&apos;m not designing, you&apos;ll find me experimenting with
              motion graphics, collecting Smiskis, or exploring new tools to push
              what&apos;s possible on the web.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
