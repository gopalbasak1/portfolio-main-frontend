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
} from "react-icons/si";
import { AiOutlineJavaScript } from "react-icons/ai";
import { RiNextjsFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

//about data
const about = {
  title: "About me",
  description:
    "🌟 Hello! I'm a dedicated frontend React developer who loves turning complex problems into user-friendly solutions. My journey in tech has allowed me to master a range of tools, from JavaScript and ES6 to Node JS and MongoDB.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Gopal Basak",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+88) 01747-065084",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Bangladesh",
    },
    {
      fieldName: "Email",
      fieldValue: "gopalbasak2324@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Job",
      fieldValue: "Available",
    },
  ],
};

//education data =
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My Education",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur iste sit autem architecto in obcaecati quis placeat cum ipsam praesentium!",
  items: [
    {
      institution: "New Model Degree College",
      degree: "Master of Business Administration(MBA)",
      duration: "2019",
      subject: "Marketing",
    },
    {
      institution: "Nasirabad College",
      degree: "Bachelor of Business Administration(BBA)",
      duration: "2017",
      subject: "Marketing",
    },
  ],
};

//Professional Course
const professionals = {
  icons: "/assets/resume/course.png",
  title: "My Professional Course",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur iste sit autem architecto in obcaecati quis placeat cum ipsam praesentium!",
  items: [
    {
      institution: "Programming Hero",
      degree: "Complete Web Development Course",
      duration: "2024",
    },
  ],
};

//sillsList
const skills = {
  title: "My Skills",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur iste sit autem architecto in obcaecati quis placeat cum ipsam praesentium!",
  skillList: [
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <AiOutlineJavaScript />,
      name: "javascript",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },
    {
      icon: <RiNextjsFill />,
      name: "next.js",
    },
    {
      icon: <SiMongodb />,
      name: "mongodb",
    },
    {
      icon: <SiFirebase />,
      name: "firebase",
    },
    {
      icon: <SiJsonwebtokens />,
      name: "jwt",
    },
    {
      icon: <SiExpress />,
      name: "express.js",
    },
    {
      icon: <FaGithub />,
      name: "github",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwindcss",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <FaCss3 />,
      name: "css3",
    },
    {
      icon: <FaHtml5 />,
      name: "html5",
    },
  ],
};

const ResumePage = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs
            defaultValue="skills"
            className="flex flex-col xl:flex-row gap-[60px]"
          >
            <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
              <TabsTrigger value="skills">Skills</TabsTrigger>

              <TabsTrigger value="education">Education</TabsTrigger>

              <TabsTrigger value="professionals">
                Professional Course
              </TabsTrigger>

              <TabsTrigger value="about">About me</TabsTrigger>
            </TabsList>

            {/* content */}
            <div className="min-h-[70vh] w-full">
              {/* skills */}
              <TabsContent value="skills" className="w-full h-full">
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-[30px] text-center xl:text-left">
                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 ">
                      {skills.description}
                    </p>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px]">
                      {skills?.skillList?.map((skill, index) => {
                        return (
                          <li key={index}>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className="w-full h-[150px] rounded-xl flex justify-center items-center group bg-[#232329] ">
                                  <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                    {skill?.icon || []}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="capitalize">
                                    {skill.name || []}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* education */}
              <TabsContent value="education" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{education.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 ">
                    {education.description}
                  </p>

                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {education.items.map((item, index) => (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent "></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.subject}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* professionals */}
              <TabsContent value="professionals" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{professionals.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 ">
                    {professionals.description}
                  </p>

                  <ScrollArea className="h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {professionals.items.map((item, index) => (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent "></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/* about */}
              <TabsContent
                value="about"
                className="w-full text-center xl:text-left"
              >
                <div className="flex flex-col gap-[30px] ">
                  <h3 className="text-4xl font-bold">{about.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 ">
                    {about.description}
                  </p>
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0 ">
                    {about.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-center xl:justify-start gap-4"
                        >
                          <span className="text-white/60">
                            {item.fieldName}:
                          </span>
                          <span className="text-xl">{item.fieldValue}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePage;
