"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import { Session } from "next-auth";
import {
  createBlog,
  uploadImageToCloudinary,
} from "@/utils/actions/createBlogs";

export type BlogData = {
  title?: string | null;
  content?: string | null;
  category?: string;
  image?: FileList | string | null;
  //session: string | null;
};

const BlogForm = ({ session }: { session: Session | null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("bs", session?.user?.accessToken);

  const onSubmit = async (data: BlogData) => {
    try {
      setLoading(true);
      let imageUrl = "";

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        if (file instanceof File) {
          imageUrl = (await uploadImageToCloudinary(file)) || "";
        }
      }
      const userId = session?.user?.id;
      const accessToken = session?.user?.accessToken;
      console.log("id, token", userId, accessToken);

      const formattedData = {
        title: data.title,
        content: data.content,
        category: data.category,
        image: imageUrl || "",
        // Or session ID if available
      };
      console.log(formattedData, userId, accessToken);
      // ✅ Check if userId or accessToken is missing
      if (!userId || !accessToken) {
        toast.error("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }
      // Pass token to the server function
      const res = await createBlog(formattedData, userId, accessToken);
      //console.log("djd", res);
      if (res.success) {
        toast.success(res.message);
        router.push(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard/blog/allBlog`
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6 "
    >
      <div className="container mx-auto flex justify-center bg-none">
        <div className="w-full max-w-md p-10 rounded-xl shadow-lg">
          <h3 className="text-4xl text-accent text-center mb-6">
            Create Your Blog
          </h3>
          <p className="text-red-500 text-[14px] font-bold text-center my-2 underline">
            Google & GitHub logged-in users cannot create blogs.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Input
              className="rounded-xl bg-[#181818]"
              type="text"
              id="title"
              {...register("title", { required: true })}
              placeholder="Blog Title"
            />
            {errors.title && <p className="text-red-500">Title is required</p>}

            <Input
              className="rounded-xl bg-[#181818]"
              type="text"
              id="category"
              {...register("category", { required: true })}
              placeholder="Blog Category"
            />
            {errors.category && (
              <p className="text-red-500">Blog Category is required</p>
            )}

            <Input
              className="rounded-xl py-2 text-[#9ca49e] bg-[#181818]"
              type="file"
              accept="image/*"
              id="image"
              {...register("image")}
            />

            <Textarea
              className="rounded-xl w-full h-48 bg-[#181818]"
              id="content"
              {...register("content", { required: true })}
              placeholder="Blog Content"
            />
            {errors.content && (
              <p className="text-red-500">Content is required</p>
            )}

            <Button
              type="submit"
              size="md"
              className="w-full py-2 hover:text-white/65"
            >
              {loading ? "Creating..." : "Create Blog"}
            </Button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default BlogForm;
