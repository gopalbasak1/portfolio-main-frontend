/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import UpdateBlogModal from "./UpdateBlogModal";
import { useState } from "react";
import { toast } from "sonner";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IMeta } from "@/types";
import { deleteBlogByAdmin } from "@/services/blog";

import BlogDeleteModal from "../ui/core/Modal/BlogDeleteModal";
import TablePagination from "../ui/core/PFTable/TablePagination";

type Blog = {
  _id: string;
  title: string;
  content: string;
  imageUrls: string[];
  category: string;
  user: {
    name: string;
  };
};

type BlogsTableProps = {
  blogs: Blog[];
  meta: IMeta;
};

const BlogsTable = ({ blogs, meta }: BlogsTableProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: Blog) => {
    console.log(data);
    setSelectedIds([data?._id]);
    setSelectedItem(data?.title);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedIds.length > 0) {
        const id = selectedIds[0]; // ✅ আইডি ফিক্স করা হলো
        const res = await deleteBlogByAdmin(id);
        if (res.success) {
          toast.success(res.message);
          setIsDeleteModalOpen(false); // ✅ Modal বন্ধ করো
          router.refresh(); // ✅ পেজ রিফ্রেশ করে আপডেট দেখাও
        } else {
          toast.error(res.message);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while deleting.");
    }
  };

  const handleUpdate = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-white">
        <thead className="">
          <tr>
            <th className="px-4 py-2 border border-gray-700">SL</th>
            <th className="px-4 py-2 border border-gray-700">Title</th>
            <th className="px-4 py-2 border border-gray-700">Content</th>
            <th className="px-4 py-2 border border-gray-700">Category</th>
            <th className="px-4 py-2 border border-gray-700">Image</th>
            <th className="px-4 py-2 border border-gray-700">Details</th>
            <th className="px-4 py-2 border border-gray-700">Author</th>
            <th className="px-4 py-2 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className=" hover:bg-gray-800">
              <td className="px-4 py-2 border border-gray-600">
                {(meta.page - 1) * meta.limit + index + 1}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {blog.title.length > 10
                  ? blog.title.slice(0, 20) + "..."
                  : blog.title}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {blog.content.length > 10
                  ? blog.content.slice(0, 25) + "..."
                  : blog.content}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {blog.category}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {blog.imageUrls[0] && (
                  <Image
                    width={64}
                    height={64}
                    src={blog.imageUrls[0]}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                <Link href={`/blogs/${blog._id}`}>
                  <span className="text-blue-400 cursor-pointer hover:underline">
                    Details
                  </span>
                </Link>
              </td>
              <td className="px-4 py-2 border border-gray-600">
                {blog?.user?.name}
              </td>
              <td className="px-4 py-2 border border-gray-600">
                <button
                  onClick={() => handleUpdate(blog)}
                  className="text-yellow-400 hover:text-yellow-500 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(blog)}
                  className="text-red-400 hover:text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <TablePagination totalPage={meta.totalPage} />
      </div>

      {/* Update Blog Modal */}
      {isModalOpen && selectedBlog && (
        <UpdateBlogModal
          blog={selectedBlog}
          onClose={() => setIsModalOpen(false)}
          router={router}
        />
      )}

      {/* Deleted Project Modal */}
      <BlogDeleteModal
        title={selectedItem}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BlogsTable;
