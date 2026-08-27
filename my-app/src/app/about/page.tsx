import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex min-h-full flex-1 flex-col px-8 py-9">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-13">
        <div className="lg:w-[90%] s-[-3rem] lg:ml-0">
          <Image
            src="/about-collage.webp"
            alt="Photo collage of Shamita"
            width={600}
            height={700}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        <div className="lg:w-[55%]">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            hi! i&apos;m shamita.
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
    </main>
  );
}
