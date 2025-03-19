"use client";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { Session } from "next-auth";

const DashboardClient = ({ session }: { session: Session | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen text-white p-6"
    >
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center w-full max-w-md">
        <motion.img
          src={session?.user?.image || ""}
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-accent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="text-2xl font-bold mt-4">{session?.user?.name}</h1>
        <p className="text-gray-400">{session?.user?.email}</p>

        <div className="flex justify-center gap-4 mt-4 text-xl">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-400"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-300"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-400"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardClient;
