import type { ProjectPreviewFields } from "@/components/sections/projects/project-hover-preview";
import { Highlight } from "@/components/ui/animated-highlight-text";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";

export type VideoProjectEntry = ProjectPreviewFields & {
  type: "video";
  id: string;
  src: string;
};

export type ImageProjectEntry = ProjectPreviewFields & {
  type: "image";
  imageUrl: string;
  imageAlt?: string;
};

export type ProjectEntry = VideoProjectEntry | ImageProjectEntry;

export type ProjectFolderSection = {
  id: string;
  title: string | ReactNode;
  date: string;
  summary: ReactNode;
  projectRole?: string;
  projects: ProjectEntry[];
};

export type ProjectFolder = {
  id: string;
  name: string;
  intro: {
    title: string | ReactNode;
    summary: ReactNode;
    year?: string | number;
    projectRole?: string;
  };
  projects: ProjectEntry[];
  /**
   * Optional labeled sub-sections rendered below the folder intro instead of
   * (or in addition to) the flat `projects` grid. Each section gets its own
   * title, date, summary, role, and project grid — used by folders like
   * "Labs" that group work by lab/initiative.
   */
  sections?: ProjectFolderSection[];
};

export const PROJECT_FOLDERS: ProjectFolder[] = [
  {
    id: "labs",
    name: "Labs",
    intro: {
      title: "Labs",
      projectRole: "Undergraduate Researcher",
      year: "2025-2026",
      summary:
        <p>My undergraduate research experience at UC San Diego has taken me 
          across two labs, where I've explored the intersection of software,
           design, and human-centered research.</p>,
    },
    projects: [],
    sections: [
      {
        id: "foundation-interface-lab",
        title: <a href="https://hci.ucsd.edu/" target="_blank" className="hover:underline flex items-center gap-1">Foundation Interface Lab <ArrowUpRightIcon className="w-4 h-4" /></a>,
        date: "2025-2026",
        projectRole: "Software Developer Research Intern",
        summary:
          <p>Conducted research in <strong>Dr. Haijun Xia's lab</strong>,
            working directly with <strong>PhD student Bryan Min</strong> to
            develop <strong>Meridian</strong>, a framework for building
            malleable, user-driven overview-detail interfaces.
            Contributed core framework features, built a full-stack
            demonstration using <strong>Next.js, TypeScript, SASS/SCSS, Firebase, GPT-4o, Tailwind CSS, and DaisyUI</strong>,
            and designed a custom toolbar for dynamic interface manipulation.
            Published Meridian as an <strong>NPM package</strong> and
            contributed to a research demonstration presented at <strong>UIST 2025</strong>.</p>,
        projects: [
          {
            type: "video",
            id: "meridian",
            title: "Meridian NPM Package",
            // projectRole: "Software Developer",
            description:
              <p>Meridian published as an NPM package.</p>,
            year: "2025-2026",
            tags: ["Framework", "NPM"],
            src: "/videos/meridian-npm.mp4",
            href: "https://www.meridian-ui.com/",
          },
          {
            type: "video",
            id: "meridian-demo",
            title: "DishCovery - Meridian Demo",
            // projectRole: "Software Developer",
            description:
              <p>A full-stack application built with Meridian framework.</p>,
            year: 2025,
            tags: ["Framework", "Demo"],
            src: "/videos/demo-app.mp4",
            href: "https://meridian-busan-app.vercel.app/",
          },
        ],
      },
      {
        id: "healthcare-robotics-lab",
        title: <a href="https://healthrobotics.ucsd.edu/" target="_blank" className="hover:underline flex items-center gap-1">Healthcare Robotics Lab <ArrowUpRightIcon className="w-4 h-4" /></a>,
        date: "2026",
        projectRole: "Designer & Software Developer Research Intern",
        summary:
          <p>Supported research in <strong>Dr. Laurel Riek's </strong>
             Lab, working closely with 
             a team of <strong>PhD and Master's students</strong>. <strong>CARMEN</strong> is a 
            socially assistive robot designed to support patients 
             through cognitive and memory-based activities. 
             I <strong>developed and tested</strong> its software interface, 
             prototype new screens and features,
             and <strong>maintain and refactor</strong> the existing codebase
              as we transition toward CARMEN 3.0, using
               <strong>TypeScript, Angular, Ionic, Flask, MongoDB, and WebSockets</strong>.
          </p>,
        projects: [
          {
            type: "image",
            title: "CARMEN - Care Robot Interface",
            // projectRole: "UX Researcher & Designer",
            description:
              <p>Coming soon.</p>,
            year: 2026,
            tags: ["HRI", "Healthcare", "Research"],
            imageUrl:
              "https://healthrobotics.ucsd.edu/assets/images/papers/hri23kubota.png",
            imageAlt: "Robotic arm assisting in a clinical setting",
            // href: "#", // TODO: add real project link
          },
        ],
      },
    ],
  },


  {
    id: "design-co",
    name: "Design Co",
    intro: {
      title: <a href="https://designatucsd.com/" target="_blank" className="hover:underline flex items-center gap-1">Design Co <ArrowUpRightIcon className="w-4 h-4" /></a>,
      projectRole: "Lead Web Developer",
      year: "2025-2026",
      summary:
        <p>Led a{" "}
          <Highlight image="/images/dco-devs.webp" imageAlt="The Design Co Developers">
            4-person development team
          </Highlight>{" "}
          in partnership with <Highlight image="/images/dco-creative.webp" imageAlt="The Design Co Designers">
            <strong>8 designers</strong>
          </Highlight> to transform UI/UX designs into responsive, production-ready websites, including <strong>Stride</strong>, <strong>Design Frontiers</strong> and <strong>Up-Grade</strong> using <strong>Next.js, React, TypeScript, Tailwind CSS, GSAP and SASS/SCSS</strong> for a 3,000+ member design organization.</p>,
    },
    projects: [
      {
        type: "video",
        id: "df",
        title: "Design Frontiers",
        // projectRole: "Software Developer",
        description:
          <p>Design Co's annual designathon—a two-day sprint where teams tackle real-world challenges with creative design solutions.</p>,
        year: 2026,
        tags: ["Designathon", "Hackathon"],
        src: "/videos/df.mp4",
        href: "https://df26.designatucsd.com/", // TODO: add real project link
      },
      {
        type: "video",
        id: "stride",
        title: "Stride",
        // projectRole: "Software Developer",
        description:
          <p>Held once a year, STRIDE (design-forward career fair) connects students with company representatives for a day of networking, resume reviews, and recruiting sessions designed to jump-start industry careers.</p>,
        year: 2025,
        tags: ["Career Fair", "Networking"],
        src: "/videos/stride.mp4",
        href: "https://stride25.designatucsd.com/", // TODO: add real project link
      },
      {
        type: "video",
        id: "upgrade",
        title: "Upgrade",
        // projectRole: "Software Developer",
        description:
          <p>UP-Grade is a 10-week mentor-led program where students solve real product challenges and build industry-ready design skills.</p>,
        year: 2025,
        tags: ["Mentorship", "Product Design"],
        src: "/videos/upgrade.mp4",
        href: "https://upgrade25.designatucsd.com/", // TODO: add real project link
      }
    ],
  },
  {
    id: "data-science",
    name: "Data Science",
    intro: {
      title: "Data Science Student Society",
      projectRole: "Designer & Frontend Engineer",
      year: "2024-2025",
      summary:
        <p>Led UI/UX design within a <Highlight image="/images/ds3-team.webp" imageAlt="The Data Science Student Society Team">12-person cross-functional team</Highlight>, to create websites for <strong>TritonBall</strong>, <strong>DS3</strong>, and <strong>DS3 Consulting</strong>.
          Designed Figma prototypes and contributed hands-on to
          front-end development using <strong>React, TypeScript, Tailwind CSS, </strong>
          and <strong>DaisyUI</strong>, translating designs across <strong>15+ production pages</strong>.</p>,
    },
    projects: [
      {
        type: "image",
        title: "Data Science Student Society Website",
        // projectRole: "Product Designer",
        description:
          <p>Coming soon.</p>,
        year: "2024-2025",
        tags: ["Website", "Full Stack"],
        imageUrl:
          "/images/ds3-website.png",
        imageAlt: "Data Science Student Society website",
        href: "https://www.ds3atucsd.com/",
      },
      {
        type: "video",
        id: "triton-ball",
        title: "Triton Ball",
        // projectRole: "Product Designer",
        description:
          <p>Coming soon.</p>,
        year: "2025",
        tags: ["Designer & Developer"],
        src: "/videos/triton-ball.mp4",
        href: "https://www.tritonball.org/",
      },
    ],
  },
  {
    id: "personal",
    name: "Personal Projects",
    intro: {
      title: "Personal Projects",
      projectRole: "Tinkering & Learning",
      summary:
        <p>Collection of personal passion projects.</p>,
    },
    projects: [
      // {
      //   type: "image",
      //   title: "Gist Lens",
      //   // projectRole: "Creator & Editor",
      //   description:
      //     <p>A smart research assistant that turns PDFs into interactive knowledge maps with visual breakdowns, explainable insights, and a chat system grounded in the document.</p>,
      //   year: 2026,
      //   tags: ["Full Stack", "AI"],
      //   imageUrl: "/images/gist-lens.png",
      //   imageAlt: "Gist Lens",
      //   href: "https://github.com/ShamitaGoyal/gist-diamondhacks",
      // },
    ],
    sections: [
      {
        id: "datahacks",
        title: "DataHacks 2026",
        date: "May 2026",
        projectRole: "Developer",
        summary:
          <p> <strong>1st Place — Zen Power Sponsor Track</strong>, DataHacks 2026.
            Built a solar savings platform using real permit data,
            local irradiance, and utility rates to estimate potential solar savings.
            Used <strong>React, TypeScript, Tailwind CSS, ECharts, D3.js,
              Three.js, Python, PostgreSQL,
              NREL Solar API, EIA 861, U.S. Census Data</strong>.
          </p>,
        projects: [
          {
            type: "video",
            id: "zenpower",
            title: "Zenpower",
            projectRole: "1st Place, Zen Power Sponsor Track",
            description:
              <p>Built in Datahacks 2026, see how much you could save with solar.
                Analyze real permit data, local irradiance,
                and utility rates to estimate your true savings.</p>,
            year: 2026,
            tags: ["Hackathon", "1st Place"],
            src: "/videos/zenpower.mp4",
            href: "https://solar-iq-bice.vercel.app/", // TODO: add real project link
          },
        ],
      },
      {
        id: "gist-lens",
        title: "Gist Lens",
        date: " May 2026",
        projectRole: "Developer",
        summary:
          <p>A smart research assistant that turns PDFs into
          interactive knowledge maps with visual breakdowns,
           explainable insights, and a chat system grounded in the document. Used <strong>React, 
           TypeScript, Tailwind CSS, Vite, FastAPI, Python, Google Gemini API, Pydantic</strong>.
           </p>,
        projects: [
          {
            type: "image",
            title: "Gist Lens",
            // projectRole: "Creator & Editor",
            description:
              <p>Coming soon.</p>,
            year: 2026,
            tags: ["Full Stack", "AI"],
            imageUrl: "/images/gist-lens.png",
            imageAlt: "Gist Lens",
            href: "https://github.com/ShamitaGoyal/gist-diamondhacks",
          },
        ],
      },
    ],

  },
];

export function getProjectFolder(id: string) {
  return PROJECT_FOLDERS.find((folder) => folder.id === id);
}
