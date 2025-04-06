"use client";

import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-white py-6 mt-12 mb-20">
      <hr className="container mb-10 border-t-2 border-white/20" />

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Brand Name */}
        <Link href="/" className="text-2xl font-semibold hover:text-accent">
          Gopal Basak
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6 mt-4 md:mt-0">
          <Link href="/resume" className="hover:text-accent transition">
            Resume
          </Link>
          <Link href="/projects" className="hover:text-accent transition">
            Projects
          </Link>
          <Link href="/blogs" className="hover:text-accent transition">
            Blogs
          </Link>
          <Link href="/contact" className="hover:text-accent transition">
            Contact
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://github.com/gopalbasak1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl hover:text-accent transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/gopal-basak-me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-xl hover:text-accent transition" />
          </a>
          <a
            href="https://www.facebook.com/gopalbasak.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-xl hover:text-accent transition" />
          </a>
          <a
            href="https://x.com/gopalbasakdip"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-xl hover:text-accent transition" />
          </a>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center text-sm text-gray-400 mt-4">
        &copy; {new Date().getFullYear()} Gopal Basak. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
