import { Suspense } from "react";
import LoginForm from "@/components/modules/Auth/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-portfolio.com"),
  title: "Login | Gopal",
  description: "Welcome to Gopal Basak's personal portfolio...",
  keywords: "...",
  authors: [{ name: "Gopal Basak" }],
  robots: "index, follow",
  openGraph: {
    title: "Gopal Basak | Frontend Developer",
    description: "Explore my portfolio to see my work as a frontend developer.",
    url: "https://your-portfolio.com/login",
    siteName: "Gopal Basak Portfolio",
    images: ["/images/portfolio-image.jpg"],
    type: "website",
  },
};

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
