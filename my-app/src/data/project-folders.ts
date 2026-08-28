import type { ProjectPreviewFields } from "@/components/sections/projects/project-hover-preview";

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

export type ProjectFolder = {
  id: string;
  name: string;
  intro: {
    title: string;
    summary: string;
    projectRole?: string;
  };
  projects: ProjectEntry[];
};

export const PROJECT_FOLDERS: ProjectFolder[] = [
  {
    id: "labs",
    name: "Labs",
    intro: {
      title: "Labs",
      projectRole: "Product Designer & Engineer",
      summary:
        "Experimental builds and rapid prototypes — interface explorations, internal tools, and side quests from research sprints.",
    },
    projects: [
      {
        type: "image",
        title: "Prototype Dashboard",
        projectRole: "Product Designer",
        description:
          "An internal analytics prototype for testing layout density and chart readability.",
        year: 2025,
        tags: ["Prototype", "Web App"],
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        imageAlt: "Dashboard with charts on a laptop screen",
      },
    ],
  },
  {
    id: "design-co",
    name: "Design Co",
    intro: {
      title: "Design Co",
      projectRole: "Lead Web Developer",
      summary:
        "Managed a 12-person cross-functional team to implement responsive websites like Stride, Design Frontiers and Up-Grade using Next.js, React, TypeScript, Tailwind CSS, GSAP and SASS/SCSS for a 3,000+ member design organization.",
    },
    projects: [
      {
        type: "video",
        id: "df",
        title: "Design Frontiers",
        projectRole: "Software Developer",
        description:
          "A brand story piece blending product demos with narrative transitions.",
        year: 2024,
        tags: ["Brand", "Edit"],
        src: "/videos/df.mp4",
      },
      {
        type: "video",
        id: "stride",
        title: "Stride",
        projectRole: "Software Developer",
        description:
          "A fitness app promo focused on rhythm, energy, and interface clarity.",
        year: 2024,
        tags: ["Mobile", "Promo"],
        src: "/videos/stride.mp4",
      },
      {
        type: "video",
        id: "upgrade",
        title: "Upgrade",
        projectRole: "Software Developer",
        description:
          "A product launch video highlighting new features with crisp UI motion and pacing.",
        year: 2025,
        tags: ["Video", "Motion"],
        src: "/videos/upgrade.mp4",
      }
    ],
  },
  {
    id: "data-science",
    name: "Data Science",
    intro: {
      title: "Data Science",
      projectRole: "Designer & Frontend Engineer",
      summary:
        "Data-heavy products — visualization, model explainability, and tools that make complex information feel approachable.",
    },
    projects: [
      {
        type: "image",
        title: "Fintech Dashboard",
        projectRole: "Product Designer",
        description:
          "A real-time analytics dashboard for tracking spend and cash flow across teams.",
        year: 2025,
        tags: ["Product", "Web App"],
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        imageAlt: "Dashboard with charts on a laptop screen",
      },
    ],
  },
  {
    id: "personal",
    name: "Personal Projects",
    intro: {
      title: "Personal Projects",
      projectRole: "Creator",
      summary:
        "Self-initiated work — videos, experiments, and portfolio pieces made outside client timelines.",
    },
    projects: [
      {
        type: "video",
        id: "zenpower",
        title: "Zenpower",
        projectRole: "Video Producer",
        description:
          "A calm wellness campaign with soft visuals and product walkthroughs.",
        year: 2023,
        tags: ["Wellness", "Campaign"],
        src: "/videos/zenpower.mp4",
      },
      {
        type: "image",
        title: "Video Series",
        projectRole: "Creator & Editor",
        description:
          "A short-form video series exploring product design process and behind-the-scenes work.",
        year: 2023,
        tags: ["Video", "Content"],
        imageUrl:
          "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
        imageAlt: "Video editing timeline on a monitor",
      },
    ],
  },
];

export function getProjectFolder(id: string) {
  return PROJECT_FOLDERS.find((folder) => folder.id === id);
}
