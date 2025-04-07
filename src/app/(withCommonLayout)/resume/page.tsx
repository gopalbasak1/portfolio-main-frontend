import ResumePage from "@/components/shared/ResumePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gopal Basak | Resume - Mern Developer",
  description:
    "Explore the resume of Gopal Basak, a passionate mern developer with expertise in React, Next.js, Tailwind CSS, Node.js, and MongoDB. Discover his skills, education, and professional training.",
  keywords: [
    "Gopal Basak",
    "Frontend Developer",
    "React Developer",
    "Web Developer",
    "Resume",
    "JavaScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "Programming Hero",
    "MERN Stack",
  ],
  authors: [{ name: "Gopal Basak", url: "https://your-portfolio-url.com" }],
  creator: "Gopal Basak",
  openGraph: {
    title: "Gopal Basak | Resume - Frontend React Developer",
    description:
      "Browse the resume of Gopal Basak. Learn about his development skills, academic background in marketing, and hands-on professional web development experience.",
    url: "https://your-portfolio-url.com/resume",
    siteName: "Gopal Basak Portfolio",
    images: [
      {
        url: "https://your-portfolio-url.com/og-image.jpg", // Optional preview image
        width: 1200,
        height: 630,
        alt: "Gopal Basak Resume",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gopal Basak | Resume",
    description:
      "Explore Gopal Basak's resume showcasing skills in React, Next.js, and modern web development.",
    images: ["https://your-portfolio-url.com/og-image.jpg"],
    creator: "@yourTwitterHandle", // optional
  },
};

const Resume = () => {
  return (
    <div>
      <ResumePage />
    </div>
  );
};

export default Resume;
