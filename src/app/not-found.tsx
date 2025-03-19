"use client";
import notFound from "./Animation - 1740419068225.json";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const NotFoundPage = () => {
  return (
    <div className="container mx-auto ">
      <div className="w-[650px] mx-auto">
        <Lottie animationData={notFound} />
      </div>
      <div className="text-center">
        <Link
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}` || "/"}
          className="mt-5 bg-white/20 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-accent  transition hover:text-black"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
