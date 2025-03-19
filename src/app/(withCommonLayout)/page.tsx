/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import Photo from "@/components/shared/Photo";
import Socials from "@/components/shared/Socials";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import React from "react";
import { FiDownload } from "react-icons/fi";
import Services from "./services/page";
import SkillPage from "@/components/shared/SkillPage";
import Link from "next/link";
import HomeProjectCard from "@/components/shared/HomeProjectCard";
import { Project } from "@/types";

// const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// // 🟢 Fetch data before rendering
// const fetchProjects = async () => {
//   try {
//     const res = await fetch(`${API_URL}/projects`, {
//       next: { revalidate: 30 },
//     });
//     if (!res.ok) throw new Error("Failed to fetch projects");
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     return { data: [] }; // Return empty data on error
//   }
// };

// 🟢 Generate Metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  // const projects = await fetchProjects();

  return {
    title: "Gopal Basak | MERN Stack Developer",
    description:
      "Passionate MERN Stack Developer specializing in React, Next.js, TypeScript, and JavaScript.",
    keywords:
      "React, Next.js, MERN Stack, TypeScript, JavaScript, Web Developer",
    openGraph: {
      title: "Gopal Basak - MERN Stack Developer",
      description:
        "Check out my latest projects and expertise in React, Next.js, and more.",
      url: "https://yourwebsite.com",
      // images: projects.data.slice(0, 1).map((project: Project) => ({
      //   url: project.image || "/default-image.jpg",
      //   width: 800,
      //   height: 600,
      //   alt: project.title,
      // })),
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: "Gopal Basak - MERN Stack Developer",
    //   description:
    //     "Explore my latest projects and expertise in modern web development.",
    //   images: projects.data
    //     .slice(0, 1)
    //     .map((project: Project) => project.image || "/default-image.jpg"),
    // },
  };
}

const HomePage = async () => {
  // const projects = await fetchProjects();

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl font-bold">React Developer</span>
            <h1 className="h1 mb-6">
              Hello I'm <br /> <span className="text-accent">Gopal Basak</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              Passionate MERN Stack Developer | Expert in React, Next.js,
              TypeScript, JavaScript | Always Learning New Tech.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a
                href="https://drive.google.com/uc?export=download&id=1gio-qf0cq7PHZP6eLXZm7RQXRbShnDVk"
                download
                className="no-underline"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>

      <Stats />

      <div>
        <SkillPage />
      </div>

      {/* Projects */}
      <div className="container mx-auto mt-[9rem]">
        <h2 className="text-4xl text-center mb-10">
          My <span className="text-accent mb-5">Projects</span>
        </h2>
        <hr className="border-t-2 border-transparent bg-gradient-to-r from-white/20 to-[#6dc5a2] animate-pulse h-1" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* {projects?.data?.slice(0, 3)?.map((project: Project) => (
            <HomeProjectCard key={project._id} project={project} />
          ))} */}
        </div>
      </div>

      {/* Link to All Projects */}
      <div className="text-center mt-8">
        <Link href="/projects">
          <Button variant="outline" size="lg" className="uppercase">
            View All Projects
          </Button>
        </Link>
      </div>

      <div className="mt-[11rem] container">
        <h2 className="text-center text-4xl font-bold text-white my-10">
          Explore{" "}
          <span className="text-accent hover:text-white ml-5">Services</span>
        </h2>
        <div className="my-10">
          <Services />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
