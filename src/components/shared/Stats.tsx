"use client";

import { useEffect, useState } from "react";
import { getAllProjectsByAdmin } from "@/services/project";
import CountUp from "react-countup";
import { getAllSkillsByAdmin } from "@/services/skill";
import { getAllBlogByAdmin } from "@/services/blog";

const Stats = () => {
  const [stats, setStats] = useState([
    { num: 0, text: "Projects completed" },
    { num: 0, text: "Technologies skilled" },
    { num: 0, text: "Blogs" }, // Modify if needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllProjectsByAdmin();
        //console.log(data);

        const { data: skills } = await getAllSkillsByAdmin();
        //console.log(skills);

        const { data: blogs } = await getAllBlogByAdmin();

        const totalProjects = data?.length || 0;

        const uniqueTechnologies = skills?.[0]?.skillList?.length || 0;

        const totalBlogs = blogs?.length || 0;

        setStats([
          { num: totalProjects, text: "Projects completed" },
          { num: uniqueTechnologies, text: "Technologies skilled" },
          { num: totalBlogs, text: " Blogs" }, // Modify if needed
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => (
            <div
              className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
              key={index}
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold"
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
