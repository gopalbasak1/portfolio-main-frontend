/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateBlogByAdmin } from "@/services/blog";
import PFImageUploader from "../ui/core/PFImageUploader";
import ImagePreviewer from "../ui/core/PFImageUploader/ImagePreviewer";

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
          <div className="flex gap-4 ">
            {imagePreview?.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="ml-[35px]"
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
