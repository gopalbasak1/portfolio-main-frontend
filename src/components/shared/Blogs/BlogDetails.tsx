"use client";
import { Blog } from "@/types";
import dayjs from "dayjs";
import Image from "next/image";
import { useTypewriter } from "react-simple-typewriter";

const BlogDetails = ({ blog }: { blog: Blog }) => {
  const { title, content, image, category, createdAt } = blog;

  //console.log(category);

  const [typeEffect] = useTypewriter({
    words: [category],
    loop: true,
    typeSpeed: 200,
    delaySpeed: 100,
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
          {image ? (
            <Image
              src={image}
              alt={title}
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
                {title}
              </h1>
              <div className="flex gap-4 items-center text-xm text-gray-500">
                <p>Publishing:</p>
                <div className="underline">
                  {dayjs(createdAt).format("MM-DD-YY")}
                </div>
              </div>

              <div className="flex items-center gap-4  p-3 rounded-lg">
                <Image
                  src={blog?.user?.image || "/default-user.png"} // Add fallback image
                  alt={blog?.user?.name || "User"}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-accent shadow-lg h-20 w-20"
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
            {image ? (
              <Image
                src={image}
                alt={title}
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
      <div className="mt-8">
        <p className="text-white/80 text-justify">{content}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
