"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateBlogByAdmin } from "@/services/blog";
import PFImageUploader from "../ui/core/PFImageUploader";
import ImagePreviewer from "../ui/core/PFImageUploader/ImagePreviewer";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./editor/menu-bar";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
}

interface UpdateBlogModalProps {
  blog: Blog;
  onClose: () => void;
  router: any;
}

const UpdateBlogModal: React.FC<UpdateBlogModalProps> = ({
  blog,
  onClose,
  router,
}) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [category, setCategory] = useState(blog.category);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    blog.imageUrls || []
  );
  const [loading, setLoading] = useState(false);

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
    content: blog.content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] w-full mx-auto rounded-lg py-2 px-5  bg-white/40",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return undefined;
    const updateContent = () => {
      setContent(editor.getHTML());
    };
    editor.on("update", updateContent);
    return () => {
      editor.off("update", updateContent);
    };
  }, [editor]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      // Ensure image URLs exist
      const imageUrls = imagePreview.length > 0 ? imagePreview : [];

      const formattedData = {
        title,
        content,
        category,
        imageUrls,
      };

      const res = await updateBlogByAdmin(formattedData, blog._id);
      if (res.success) {
        toast.success(res.message);
        router.push(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/admin/dashboard/blog/allBlog`
        );
        router.refresh();
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="fixed inset-0  bg-opacity-50 flex justify-center items-center container mx-auto"
    >
      <div className="bg-[#111827]  p-6 rounded-xl shadow-lg space-y-5 max-h-[70vh] overflow-y-auto border border-accent md:w-[480px] lg:w-[800px] md:ml-[275px] mx-2">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          Update Blog
        </h2>

        <div>
          <label className="text-white">Blog Title *</label>
          <Input
            type="text"
            className="w-full p-2 mb-2 bg-[#1c1c22] text-white rounded-xl"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white">Blog Category *</label>
          <Input
            type="text"
            className="w-full p-2 mb-2 bg-[#1c1c22] text-white rounded-xl"
            placeholder="Live Link"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <div className="flex gap-4 ">
            {imagePreview?.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="ml-[20px] md:ml-[50px] lg:ml-[150px]"
              />
            ) : (
              <PFImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Blog Image"
              />
            )}
          </div>
        </div>

        <div className="">
          <label className="text-white">Blog Content *</label>
          {editor ? (
            <>
              <MenuBar editor={editor} />
              <EditorContent
                editor={editor}
                className=" 
                    bg-[#282626]
                    text-black    border-transparent rounded-xl focus:outline-none "
              />
            </>
          ) : (
            "Loading editor..."
          )}
        </div>

        <div className="flex justify-end gap-3 pt-10">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-red-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-cyan-800 hover:bg-accent hover:text-black text-white px-4 py-2 rounded-xl"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateBlogModal;
