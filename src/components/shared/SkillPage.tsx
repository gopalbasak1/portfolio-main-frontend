"use client";

import {
  FaHtml5,
  FaCss3,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMongodb,
  SiFirebase,
  SiJsonwebtokens,
  SiExpress,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import { AiOutlineJavaScript } from "react-icons/ai";
import { RiNextjsFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const skills = {
  title: "My Skills",
  description: "Here are some of the technologies I've worked with:",
  skillList: [
    { icon: <RiNextjsFill />, name: "Next.js" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiRedux />, name: "Redux" },
    { icon: <AiOutlineJavaScript />, name: "JavaScript" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiFirebase />, name: "Firebase" },
    { icon: <SiJsonwebtokens />, name: "JWT" },
    { icon: <SiExpress />, name: "Express.js" },
    { icon: <FaGithub />, name: "GitHub" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <FaCss3 />, name: "CSS3" },
    { icon: <FaHtml5 />, name: "HTML5" },
  ],
};

const SkillPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-[30px] text-center xl:text-left">
          <h3 className="text-4xl font-bold">{skills.title}</h3>
          <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 mb-10">
            {skills.description}
          </p>
        </div>

        <ScrollArea className="h-[400px]">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px]">
            {skills.skillList.map((skill, index) => (
              <li key={index}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-[150px] rounded-xl flex justify-center items-center group bg-[#232329]">
                      <div className="text-6xl group-hover:text-accent transition-all duration-300">
                        {skill.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="capitalize">{skill.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

export default SkillPage;
