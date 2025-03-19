"use client";

import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-center p-8 bg-red-600 shadow-lg rounded-xl max-w-lg w-full"
      >
        <FaExclamationTriangle className="text-6xl text-white mx-auto animate-pulse" />
        <h2 className="text-3xl font-bold mt-4">Oops! Something Went Wrong</h2>
        <p className="text-lg mt-2 opacity-80">
          {error.message || "An unexpected error occurred."}
        </p>

        <button
          onClick={() => reset()}
          className="mt-5 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition-all duration-300"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
