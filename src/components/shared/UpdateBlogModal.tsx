/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
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
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let imageUrl = blog.image;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
          "upload_preset",
          `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
        );

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error("Image upload failed");
        }
        imageUrl = data.secure_url;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
            image: imageUrl,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      toast.success("Blog updated successfully!");
      onClose(); // Close modal after update
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-[#111827]  p-6 rounded-xl w-96 shadow-lg space-y-5">
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
          <label className="text-white">Blog Content *</label>
          <Textarea
            className="w-full p-2 mb-2 bg-[#1c1c22] text-white rounded-xl"
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label className="text-white">Blog Image *</label>
          <Input
            type="file"
            className="w-full p-2 bg-[#1c1c22] text-white rounded-xl"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]); // Now TypeScript knows it's safe
              }
            }}
          />
        </div>

        <div className="flex justify-end gap-3">
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
