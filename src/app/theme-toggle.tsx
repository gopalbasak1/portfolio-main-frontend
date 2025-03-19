"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import Image from "next/image";
import newMoon from "../../public/assets/new-moon.png";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the theme is only set after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2  dark:bg-gray-900 rounded-lg"
    >
      {theme === "dark" ? (
        <Image
          src={newMoon} // Change this to a valid local image or external direct URL
          alt="Moon Icon"
          width={24}
          height={24}
          className="text-yellow-400"
        />
      ) : (
        <Moon className="text-blue-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
