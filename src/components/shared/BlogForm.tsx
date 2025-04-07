"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import {
  createBlog,
  uploadImageToCloudinary,
} from "@/utils/actions/createBlogs";
import ImagePreviewer from "../ui/core/PFImageUploader/ImagePreviewer";
import PFImageUploader from "../ui/core/PFImageUploader";
import { addBlog } from "@/services/blog";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
// or wherever it is

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./editor/menu-bar";

export type BlogData = {
  title?: string | null;
  content?: string | null;
  category?: string;
  imageUrls?: string[];
};

const BlogForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  //* Text Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[156px] rounded-md py-2 px-5  bg-white/40",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  useEffect(() => {
    register("content", {
      required: "Content is required",
    });
  }, [register]);

  useEffect(() => {
    if (!editor) return undefined;

    const updateContent = () => {
      const html = editor.getHTML();
      setValue("content", html, { shouldValidate: true });
    };

    editor.on("update", updateContent);
    return () => {
      editor.off("update", updateContent);
    };
  }, [editor, setValue]);

  const onSubmit = async (data: BlogData) => {
    try {
      setLoading(true);

      //* Force update content before submission
      if (editor) {
        data.content = editor.getHTML();
      }

      const formattedData = {
        ...data,
        imageUrls: imagePreview,
      };

      const res = await addBlog(formattedData);
      if (res.success) {
        toast.success(res.message);
        router.push(
          "https://gopal-zeta.vercel.app/admin/dashboard/blog/allBlog"
        );
      }
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
      <div className="w-full mx-auto flex justify-center bg-none">
        <div className="w-[600px]  mx-auto p-10 rounded-xl shadow-lg">
          <h3 className="text-4xl text-accent text-center mb-6 ">
            Create Your Blog
          </h3>

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

            <div className="flex gap-4 ">
              {imagePreview?.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  className="ml-[30px] md:ml-[62px] lg:ml-[120px]"
                />
              ) : (
                <PFImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Blog Image"
                />
              )}
            </div>

            {/* Tiptap Editor */}
            <div className="rounded-xl p-4  border-none mx-auto ">
              {editor ? (
                <>
                  <MenuBar editor={editor} />
                  <EditorContent
                    editor={editor}
                    className=" 
                    bg-[#282626]
                    text-black    border-transparent rounded-lg focus:outline-none "
                  />
                </>
              ) : (
                "Loading editor..."
              )}
            </div>

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
