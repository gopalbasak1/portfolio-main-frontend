// app/projects/page.tsx or wherever your route is
import ProjectCard from "@/components/shared/ProjectCard";
import SliderProject from "@/components/shared/SliderProject";
import { getAllProjectsByAdmin } from "@/services/project";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 🟢 Fetch data for metadata generation
export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
    const projects = await res.json();

    const firstProject = projects?.data?.[0];

    return {
      title: "Projects - Gopal Basak",
      description:
        firstProject?.description ||
        "Explore my latest React and Next.js projects.",
      keywords: `Projects, Portfolio, ${firstProject?.title || ""}, ${
        firstProject?.stack?.join(", ") || ""
      }`,
      openGraph: {
        title: `${firstProject?.title || "Projects"} | Gopal Basak`,
        description:
          firstProject?.description ||
          "Explore professional projects by Gopal Basak.",
        url: "https://yourwebsite.com/projects",
        images: [
          {
            url: firstProject?.image || "/default-image.jpg",
            width: 800,
            height: 600,
            alt: firstProject?.title || "Project image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: firstProject?.title || "Projects - Gopal Basak",
        description:
          firstProject?.description || "Explore React/Next.js projects.",
        images: [firstProject?.image || "/default-image.jpg"],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Projects - Gopal Basak",
      description: "Explore projects built using React, Next.js, and more.",
    };
  }
}

// 🟢 Projects Page Component
const Projects = async () => {
  const { data } = await getAllProjectsByAdmin();

  return (
    <div className="h-auto my-20">
      <div>
        <SliderProject projects={{ data }} />
      </div>

      <div className="container mx-auto mt-10 md:mt-36 h-auto">
        <ProjectCard projects={{ data }} />
      </div>
    </div>
  );
};

export default Projects;
