"use client";
import { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllSkillsByAdmin } from "@/services/skill";
import { RiNextjsFill } from "react-icons/ri";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFigma,
  FaCss3,
  FaHtml5,
} from "react-icons/fa";
import {
  SiTypescript,
  SiRedux,
  SiMongodb,
  SiFirebase,
  SiJsonwebtokens,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";
import { AiOutlineJavaScript } from "react-icons/ai";

const iconMap: { [key: string]: JSX.Element } = {
  RiNextjsFill: <RiNextjsFill />,
  FaReact: <FaReact />,
  FaNodeJs: <FaNodeJs />,
  SiTypescript: <SiTypescript />,
  SiRedux: <SiRedux />,
  AiOutlineJavaScript: <AiOutlineJavaScript />,
  SiMongodb: <SiMongodb />,
  SiFirebase: <SiFirebase />,
  SiJsonwebtokens: <SiJsonwebtokens />,
  SiExpress: <SiExpress />,
  FaGithub: <FaGithub />,
  SiTailwindcss: <SiTailwindcss />,
  FaFigma: <FaFigma />,
  FaCss3: <FaCss3 />,
  FaHtml5: <FaHtml5 />,
};

// ✅ Define a TypeScript interface for skills
interface Skill {
  _id: string;
  name: string;
  icon: string;
}

interface SkillsData {
  title: string;
  description: string;
  skillList: Skill[];
}

const SkillPage = () => {
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await getAllSkillsByAdmin();
        console.log("Fetched Skills:", data);
        setSkills(data?.[0] || null); // Extract the first object
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading)
    return <p className="text-center text-white">Loading skills...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!skills)
    return <p className="text-center text-white">No skills found.</p>;

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
          <p className="max-w-[600px] text-white/60 mx-auto mb-10">
            {skills.description}
          </p>
        </div>

        <ScrollArea className="h-[400px] p-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px]">
            {skills.skillList.map((skill) => (
              <li key={skill._id}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-full h-[150px] rounded-xl flex justify-center items-center group bg-[#232329]">
                      <div className="text-6xl text-white group-hover:text-accent">
                        {iconMap[skill.icon] || "❓"}
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
