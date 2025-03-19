import { Blog } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa6";
import { BookOpenCheck } from "lucide-react";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BlogCard = ({ blog }: { blog: Blog }) => {
  console.log(blog.title);
  return (
    <div className="w-full shadow-md overflow-hidden border-2 border-white/20 rounded-xl h-[550px]">
      <figure className="h-64">
        <Image
          src={blog?.image}
          width={600}
          height={100}
          alt="blog image"
          className="rounded-t-lg h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
      <div className="p-6 h-[294px]">
        <div className="flex justify-between md:flex-col h-[50px]">
          <p className="flex items-center text-accent underline rounded-full py-1 text-sm">
            <FaCalendar className="mr-2" />
            {dayjs(blog.createdAt).format("MM/DD/YYYY")}
          </p>
          <p className="capitalize text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 animate-glow">
            {blog.category}
          </p>
        </div>
        <div className="h-[100px]">
          <h2 className="text-xl font-bold mt-4">
            <span className="text-white/30">Title:</span>{" "}
            {blog.title.length > 10
              ? blog.title.slice(0, 20) + "..."
              : blog.title}
          </h2>

          {/* Show User Name */}
          {blog.user?.name && (
            <p className="text-sm font-medium text-gray-500 mt-2">
              By:{" "}
              <span className=" font-semibold text-accent hover:underline cursor-pointer">
                {blog.user.name}
              </span>
            </p>
          )}
        </div>

        {/* Show Buttons If Links Exist */}
        <div className="flex items-center gap-4 mt-5">
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
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
