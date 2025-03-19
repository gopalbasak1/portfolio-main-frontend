"use client";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getMe } from "@/services/user";
import UserUpdateModal from "../ui/core/Modal/UserUpdateModal";

const DashboardClient = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Function to open the update modal
  const handleUpdate = (profile: any) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  // Fetch user details
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      console.log(response);
      if (response?.success) {
        setUser(response.data);
      } else {
        setError(response?.message || "Failed to load user data");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen text-white p-6"
    >
      {loading ? (
        <p className="text-gray-400">Loading user details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center w-full max-w-md">
          <button
            onClick={() => handleUpdate(user)}
            className="flex justify-end"
          >
            <Edit />
          </button>
          <motion.img
            src={user?.imageUrls?.[0] || "/default-avatar.png"}
            alt="User Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-2xl font-bold mt-4">{user?.name}</h1>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-gray-400">{user?.phoneNumber}</p>

          {/* Social Links */}
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

          {/* Update Modal */}
          {isModalOpen && selectedProfile && (
            <UserUpdateModal
              profile={selectedProfile}
              onClose={() => setIsModalOpen(false)}
              user={user}
              isOpen={isModalOpen} // ✅ Add this line
              
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardClient;
