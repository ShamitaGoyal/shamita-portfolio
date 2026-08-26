import { ProjectCard } from "@/components/ui/project-card";

const PROJECTS = [
  {
    title: "Fintech Dashboard",
    description:
      "A real-time analytics dashboard for tracking spend and cash flow across teams.",
    year: 2025,
    tags: ["Product", "Web App"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imageAlt: "Dashboard with charts on a laptop screen",
    href: "#",
  },
  {
    title: "Wellness Mobile App",
    description:
      "A habit-tracking app that helps users build routines with gentle nudges and streaks.",
    year: 2024,
    tags: ["Mobile", "UX"],
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    imageAlt: "Person using a mobile app on their phone",
    href: "#",
  },
  {
    title: "Design System",
    description:
      "A component library and documentation site used across a company's product suite.",
    year: 2024,
    tags: ["Design System", "Docs"],
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
    imageAlt: "Design workspace with UI components on a screen",
    href: "#",
  },
  {
    title: "Video Series",
    description:
      "A short-form video series exploring product design process and behind-the-scenes work.",
    year: 2023,
    tags: ["Video", "Content"],
    imageUrl:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop",
    imageAlt: "Video editing timeline on a monitor",
    href: "#",
  },
] as const;

export default function Work() {
  return (
    <main className="flex min-h-full flex-1 flex-col px-8 py-16">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  );
}
