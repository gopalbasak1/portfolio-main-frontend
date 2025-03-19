/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Image from "next/image";
import Link from "next/link";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { useTypewriter } from "react-simple-typewriter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Project } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { FaCalendar } from "react-icons/fa6";
import dayjs from "dayjs";

const ProjectsDetails = ({ project }: { project: Project }) => {
  const { title, description, image, liveLink, github, stack, category } =
    project;

  const [typeEffect] = useTypewriter({
    words: [category],
    loop: true,
    typeSpeed: 200,
    delaySpeed: 100,
  });
  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile: Image at top; Desktop: Image on right */}
        <div className="lg:hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-xl mb-4"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl mb-4">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center w-full">
          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="text-4xl font-medium text-balance text-outline h-10 ">
                {typeEffect}
              </div>
              <h1 className="text-3xl font-bold text-white capitalize">
                {title}
              </h1>
              <div>
                <ul className="flex flex-wrap gap-2">
                  {stack &&
                    stack.map((item: any, index: number) => (
                      <li key={index} className="text-lg text-accent">
                        {item.name}
                        {index !== stack.length - 1 && ","}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex items-center gap-4  p-3 rounded-lg">
                <Image
                  src={project?.user?.image || "/default-user.png"} // Add fallback image
                  alt={project?.user?.name || "User"}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-accent shadow-lg h-14 w-14"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-white">
                    {project?.user?.name || "Unknown"}
                  </span>
                  <span className="text-sm text-gray-400">Project Author</span>
                  <p className="flex items-center text-accent underline rounded-full py-1 text-sm">
                    <FaCalendar className="mr-2" />
                    {dayjs(project.createdAt).format("MM/DD/YYYY")}
                  </p>
                </div>
              </div>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                {liveLink && (
                  <Link href={liveLink}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center">
                          <BsArrowUpRight className="text-white text-2xl hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live Project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
                {github && (
                  <Link href={github}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center">
                          <BsGithub className="text-white text-2xl hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Github Repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Desktop: Image Section */}
          <div className="hidden lg:block w-full lg:w-1/2">
            <ScrollArea className="h-[700px]">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl">
                  No Image Available
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {/* Description Section */}
      <div className="mt-8 text-white/80 text-justify leading-relaxed">
        {description && (
          <p>
            <span className="text-5xl font-bold text-white">
              {description.split(" ")[0]}
            </span>{" "}
            {description.split(" ").slice(1).join(" ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectsDetails;
