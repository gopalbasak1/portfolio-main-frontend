"use client";
import { FaCalendar } from "react-icons/fa6";
import dayjs from "dayjs";
import Link from "next/link";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Forward } from "lucide-react";

interface Project {
  _id: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  liveLink?: string;
  github?: string;
  createdAt?: string;
  user?: { name: string };
}

type SliderProjectProps = {
  projects: { data: Project[] };
};

const ProjectCard = ({ projects }: SliderProjectProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects?.data?.slice(3).map((project) => (
        <div key={project._id}>
          <div className="w-full shadow-md overflow-hidden border-2 border-white/20 rounded-xl">
            <figure>
              <Image
                src={project?.image}
                width={600}
                height={100}
                alt="project image"
                className="rounded-t-lg h-64 w-full object-cover  transition-transform duration-300 hover:scale-105"
              />
            </figure>
            <div className="p-6">
              <div className="flex justify-between">
                <p className="flex items-center text-accent underline rounded-full py-1 text-sm">
                  <FaCalendar className="mr-2" />
                  {dayjs(project.createdAt).format("MM/DD/YYYY")}
                </p>
                <p>{project.category}</p>
              </div>
              <h2 className="text-xl font-bold mt-4">
                {project.title.length > 20
                  ? project.title.slice(0, 30) + "..."
                  : project.title}
              </h2>

              {/* Show User Name */}
              {project.user?.name && (
                <p className="text-sm font-medium text-gray-500 mt-2">
                  By:{" "}
                  <span className="font-semibold text-accent hover:underline cursor-pointer">
                    {project.user.name}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-4 mt-5">
                {project.liveLink && (
                  <Link href={project.liveLink} target="_blank">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-12 h-12 rounded-full bg-gray-800 flex justify-center items-center hover:bg-gray-700">
                          <BsArrowUpRight className="text-white text-xl" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live Project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}

                {project.github && (
                  <Link href={project.github} target="_blank">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-12 h-12 rounded-full bg-gray-800 flex justify-center items-center hover:bg-gray-700">
                          <BsGithub className="text-white text-xl" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub Repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}

                <Link href={`/projects/${project._id}`}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-12 h-12 rounded-full bg-gray-800 flex justify-center items-center hover:bg-gray-700">
                        <Forward className="text-white text-xl" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
