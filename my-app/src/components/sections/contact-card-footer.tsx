import { ScrambleText } from "@/components/ui/scramble-text";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicLiveClock = dynamic(
  () =>
    import("@/components/ui/live-clock").then(
      (mod) => mod.LiveClock
    ),
  {
    loading: () => <div>&nbsp;</div>,
    ssr: false,
  }
);

export function ContactCardFooter() {
  return (
    <footer id="contact">
      <ul className="flex flex-col items-center gap-6 p-6 text-center min-[1067px]:flex-row min-[1067px]:items-center min-[1067px]:justify-between min-[1067px]:text-left">
        <li className="flex flex-col items-center min-[1067px]:items-start">
          <p className="max-w-full text-[2.5rem] leading-tight font-semibold break-words sm:text-[3.5rem] min-[1067px]:text-[5rem]">
            <ScrambleText
              text="SHAMITA GOYAL ⊹ ࣪ ˖"
              speed={45}
            />
          </p>

          <DynamicLiveClock className="opacity-50 -mt-1" />
        </li>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-lg min-[1067px]:flex-nowrap min-[1067px]:gap-10 min-[1067px]:text-xl min-[1067px]:mt-[2rem]">
          <li className="hover:text-gray-500 transition-colors duration-300">
            <Link href="mailto:goyal.shamita4@gmail.com" target="_blank">
              EMAIL
            </Link>
          </li>

          <li className="hover:text-gray-500 transition-colors duration-300">
            <Link href="/resume.pdf" target="_blank">
              RESUME
            </Link>
          </li>

          <li className="hover:text-gray-500 transition-colors duration-300">
            <Link
              href="https://www.linkedin.com/in/shamita-goyal-46323b250/"
              target="_blank"
            >
              LINKEDIN
            </Link>
          </li>

          <li className="hover:text-gray-500 transition-colors duration-300">
            <Link
              href="https://github.com/ShamitaGoyal"
              target="_blank"
            >
              GITHUB
            </Link>
          </li>
        </div>
      </ul>
    </footer>
  );
}