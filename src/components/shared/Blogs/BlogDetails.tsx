"use client";
import { Blog } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import { useTypewriter } from "react-simple-typewriter";

const BlogDetails = ({ blog }: { blog: Blog }) => {
  // const { title, content, imageUrls, category, createdAt } = blog;

  const [typeEffect] = useTypewriter({
    words: [blog?.category],
    loop: true,
    typeSpeed: 700,
    delaySpeed: 200,
  });

  //console.log(typeEffect);
  return (
    <div
      className="container 
    mx-auto my-10 px-4"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile: Image at top; Desktop: Image on right */}
        <div className="lg:hidden">
          {blog?.imageUrls[0] ? (
            <Image
              src={blog?.imageUrls[0]}
              alt={blog?.title}
              width={800}
              height={450}
              className="w-full h-auto object-cover rounded-xl mb-4"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl mb-4">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center w-full">
          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="space-y-8">
              <div className="text-4xl font-medium text-white/25 text-outline h-10 capitalize">
                {typeEffect}
              </div>
              <h1 className="text-xm font-bold text-white capitalize">
                {blog?.title}
              </h1>
              <div className="flex gap-4 items-center text-xm text-gray-500">
                <p>Publishing:</p>
                <div className="underline">
                  {dayjs(blog?.createdAt).format("MM-DD-YY")}
                </div>
              </div>

              <div className="flex items-center gap-4  p-3 rounded-lg">
                <Image
                  src={blog?.user?.imageUrls?.[0] || "/default-user.png"} // Add fallback image
                  alt={blog?.user?.name || "User"}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-accent shadow-lg h-[50px] w-[50px]"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-white">
                    {blog?.user?.name || "Unknown"}
                  </span>
                  <span className="text-sm text-gray-400">Blog Author</span>
                </div>
              </div>

              <div className="border border-white/20"></div>
            </div>
          </div>

          {/* Desktop: Image Section */}
          <div className="hidden lg:block w-full lg:w-1/2">
            {blog?.imageUrls[0] ? (
              <Image
                src={blog?.imageUrls[0]}
                alt={blog?.title ?? "Blog Image"}
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl">
                No Image Available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div
        className="prose prose-invert max-w-none text-white/80 my-10"
        dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
      ></div>
    </div>
  );
};

export default BlogDetails;
