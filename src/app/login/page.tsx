import LoginForm from "@/components/modules/Auth/login/LoginForm";
import { Metadata } from "next";

// SEO Metadata for the page
export const metadata: Metadata = {
  title: "Login | Gopal",
  description:
    "Welcome to Gopal Basak's personal portfolio. Here, you can explore my projects, skills, and experience as a mern developer.",
  keywords:
    "Gopal Basak, Mern Stack Developer, Frontend Developer, React, Next Js, Redux, MongoDB, JavaScript, Jwt, Portfolio",
  authors: [{ name: "Gopal Basak" }], // Fix for 'author'
  robots: "index, follow",
  openGraph: {
    title: "Gopal Basak | Frontend Developer",
    description: "Explore my portfolio to see my work as a frontend developer.",
    url: "https://your-portfolio.com", // Update with actual URL
    siteName: "Gopal Basak Portfolio", // Corrected from 'site_name' to 'siteName'
    images: ["/images/portfolio-image.jpg"], // Ensure this image exists in 'public/images/'
    type: "website",
  },
};

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center mx-auto">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
