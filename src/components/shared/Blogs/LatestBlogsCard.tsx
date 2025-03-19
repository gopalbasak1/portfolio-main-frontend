import Image from "next/image";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import dayjs from "dayjs";
import { Blog } from "@/types"; // Adjust the import to match your types
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpenCheck } from "lucide-react";

interface LatestBlogCardProps {
  blog: Blog;
}

const LatestBlogCard = ({ blog }: LatestBlogCardProps) => {
  return (
    <div className=" rounded-xl shadow-lg overflow-hidden flex flex-col border border-white/20">
      {/* Blog Image */}
      <div className="relative w-full h-56">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Blog Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Date */}
        <div className="flex items-center text-accent text-sm mb-2">
          <FaCalendar className="mr-1" />
          {dayjs(blog.createdAt).format("MMM D, YYYY")}
        </div>

        <p className="capitalize text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-glow">
          {blog.category}
        </p>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-300 mb-2 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 flex-1 mb-4 line-clamp-3">
          {blog.content.length > 20
            ? blog.content.slice(0, 30) + "..."
            : blog.content}
        </p>

        {/* Footer: Details button and Author info */}
        <div className="flex items-center justify-between px-2 mt-4">
          {/* Details Button */}
          <Link href={`/blogs/${blog._id}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-12 h-12 rounded-full bg-gray-800 flex justify-center items-center hover:bg-gray-700   ">
                  <BookOpenCheck className="text-white text-xl hover:text-accent" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Read More</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>

          {/* Author Info */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 relative">
              <Image
                src={blog?.user?.image || "/default-avatar.png"}
                alt={blog?.user?.name || ""}
                fill
                className="rounded-full object-cover hover:border-2 hover:border-accent"
              />
            </div>
            <span className="text-gray-300 text-sm hover:text-accent hover:underline cursor-pointer">
              {blog?.user?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogCard;
