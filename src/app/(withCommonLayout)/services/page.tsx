"use client";

import { BsArrowDownRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "A React developer builds dynamic, interactive user interfaces using reusable components, manages application state, optimizes performance, and integrates APIs to create seamless, modern web applications.",
    href: "",
  },
  {
    num: "02",
    title: "Graphics Designer",
    description:
      "Graphic design services include creating visually appealing logos, branding, marketing materials, social media graphics, and digital assets that communicate a brand's message and enhance its visual identity.",
    href: "",
  },
  {
    num: "03",
    title: "Google Ads",
    description:
      "Google Ads services include creating, managing, and optimizing pay-per-click (PPC) campaigns, targeting relevant keywords to increase traffic, generate leads, and boost conversions for businesses.",
    href: "",
  },
  {
    num: "04",
    title: "Ms Office",
    description:
      "MS Office services include expert document creation, data analysis with Excel, professional presentations in PowerPoint, email management via Outlook, and streamlining workflows using Microsoft Office tools.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* heading */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 ">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
