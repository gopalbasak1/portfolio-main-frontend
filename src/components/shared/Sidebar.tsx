"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Mails, Rows4, ScrollText } from "lucide-react";
import ThemeToggle from "@/app/theme-toggle";
import { MdAddChart } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#00ff99] text-gray-900 p-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={20} />
      </button>
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 min-h-screen w-64  text-white p-4 border-r-4 border-[#00ff99] transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ zIndex: 100 }}
      >
        {/* Close Button (Mobile) */}
        <button
          className="md:hidden absolute top-4 right-4 bg-red-500 text-white p-2 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes size={20} />
        </button>

        <ul className="space-y-4 mt-10">
          <li>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <FaHome className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <LuLayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/usersInfo"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard/usersInfo")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <LuUsersRound className="h-5 w-5" />
              <span>All-User-Info</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/project/createProject"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard/project/createProject")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <MdAddChart className="h-5 w-5" />
              <span>Create Project</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/project/allProject"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard/project/allProject")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <ScrollText className="h-5 w-5" />
              <span>All Project</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/blog/createBlog"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard/blog/createBlog")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <MdOutlineCreateNewFolder className="h-5 w-5" />
              <span>Create Blog</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/blog/allBlog"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard/blog/allBlog")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <Rows4 className="h-5 w-5" />
              <span>All Blog</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/message"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 p-2 rounded-xl ${
                isActive("/dashboard/message")
                  ? "underline text-[#00ff99]"
                  : "hover:text-[#00ff99] hover:underline"
              }`}
            >
              <Mails className="h-5 w-5" />
              <span>Messages</span>
            </Link>
          </li>
        </ul>

        <button
          onClick={() => {
            setIsOpen(false);
            signOut();
          }}
          className="flex items-center space-x-2 text-red-400 hover:text-red-600 p-2 rounded-xl hover:underline mt-4"
        >
          <FaSignOutAlt className="h-5 w-5" />
          <span>Sign Out</span>
        </button>

        <div className="hidden md:block lg:block fixed">
          <ThemeToggle />
        </div>
      </div>
      {/* 🟢 Background Overlay (Closes Sidebar on Click) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
