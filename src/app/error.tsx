"use client";

import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // Replace with your button component if different

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-center bg-red-600/90 border border-red-500 backdrop-blur-md p-8 shadow-2xl rounded-2xl max-w-lg w-full space-y-4"
      >
        <FaExclamationTriangle className="text-yellow-300 text-5xl mx-auto" />
        <h1 className="text-3xl font-bold">Something Went Wrong</h1>
        <p className="text-sm text-red-100">{error.message}</p>

        {error.digest && (
          <p className="text-xs text-red-200 opacity-70">
            Error ID: {error.digest}
          </p>
        )}

        <button
          onClick={reset}
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
