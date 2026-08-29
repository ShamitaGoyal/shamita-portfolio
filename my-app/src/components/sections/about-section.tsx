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
            I'm a recent new grad from the University of California, 
            San Diego, where I studied Cognitive Science with a 
            specialization in Human-Computer Interaction and Design.
             I'm passionate about software development, interface design, 
             and building digital experiences that are both functional 
             and thoughtfully designed.
            </p>
            <p>
            I've always been drawn to creating 
            things—from art and design to coding and 
            web development. Today, I channel that 
            curiosity into building software, developing 
            responsive interfaces, and exploring 
            how thoughtful design can make technology 
            easier and more enjoyable to use.
            </p>
            <p>
            When I'm not coding or designing, you'll probably find me cooking, drawing, listening to music, or taking photos with my digital camera.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
