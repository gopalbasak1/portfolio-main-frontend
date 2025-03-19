"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Swiper as SwiperClass } from "swiper";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import Link from "next/link";
import Image from "next/image";

import { Autoplay } from "swiper/modules";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import WorkSliderBtns from "./WorkSliderBtns";
import { Forward } from "lucide-react";
import { useTypewriter } from "react-simple-typewriter";

// Define your Project type
interface Project {
  user: {
    name: string;
    image: string;
  };
  _id: string;
  num?: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  liveLink?: string;
  github?: string;
}

type SliderProjectProps = {
  projects: { data: Project[] };
};

const SliderProject = ({ projects }: SliderProjectProps) => {
  // Assume projects.data is an array of Project objects.
  const [project, setProject] = useState<Project>(projects.data[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperClass) => {
    const index = swiper.activeIndex;
    setCurrentIndex(index);
    setProject(projects.data[index]); // Update the project when the slide changes
  };

  const [typeEffect] = useTypewriter({
    words: ["Projects"],
    loop: true,
    typeSpeed: 200,
    delaySpeed: 100,
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="">
          <h2 className="text-center text-4xl font-bold mb-24">
            Latest <span className="text-accent">{typeEffect}</span>
          </h2>
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          {/* Left side: Project details */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-bold text-outline text-white/25">
                {/* Optionally display project.num */}
                {currentIndex + 1}
              </div>
              <p className="text-[20px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category}
              </p>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.title}
              </h2>
              <p className="text-white/60">
                {project.description.length > 10
                  ? project.description.slice(0, 80)
                  : project.description}
              </p>

              {/* Stack */}
              {/* Stack */}
              <ul className="flex flex-wrap gap-2">
                {project.stack.slice(0, 10).map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== project.stack.slice(0, 10).length - 1 && ","}
                  </li>
                ))}
                {project.stack.length > 10 && (
                  <li className="text-xl text-accent">...</li>
                )}
              </ul>

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
                </div>
              </div>

              <div className="border border-white/20"></div>

              <div className="flex items-center gap-4">
                {/* Live project button */}
                {project.liveLink && (
                  <Link href={project.liveLink}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}

                {/* Github project button */}
                {project.github && (
                  <Link href={project.github}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsGithub className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Github repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
                {/* Details  button */}
                <Link href={`/projects/${project._id}`}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <Forward className="text-white text-3xl group-hover:text-accent" />
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

          {/* Right side: Slider */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[700px] mb-12"
              onSlideChange={handleSlideChange}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {projects.data.slice(0, 3).map((proj) => (
                <SwiperSlide key={proj._id} className="w-full">
                  <div className="h-[650px] relative group flex justify-center items-center bg-pink-50/20 rounded-xl">
                    <div className="relative w-full h-full rounded-xl">
                      <Image
                        src={proj.image}
                        fill
                        className="object-cover rounded-xl"
                        alt={proj.title}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-2xl"
                iconsStyles="text-white text-xl"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SliderProject;
