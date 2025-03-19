import ResumePage from "@/components/shared/ResumePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gopal Basak | Resume",
  description: "Explore my skills, education, and professional experience.",
};

const Resume = () => {
  return (
    <div>
      <ResumePage />
    </div>
  );
};

export default Resume;
