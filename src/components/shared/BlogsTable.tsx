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

type Blog = {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  user: {
    name: string;
  };
};

type BlogsTableProps = {
  blogs: Blog[];
  session: any;
};

const BlogsTable = ({ blogs, session }: BlogsTableProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      setLoading(true);

      const token = session?.user?.accessToken;
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error("Delete error:", data);
        throw new Error(data.message || "Failed to delete blog");
      }

      toast.success("Blog deleted successfully!");

      router.refresh();
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Something went wrong while deleting.");
    } finally {
      setLoading(false);
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
              <td className="px-4 py-2 border border-gray-600">{index + 1}</td>
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
                {blog.image && (
                  <Image
                    width={64}
                    height={64}
                    src={blog.image}
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
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Blog Modal */}
      {isModalOpen && selectedBlog && (
        <UpdateBlogModal
          blog={selectedBlog}
          onClose={() => setIsModalOpen(false)}
          router={router}
        />
      )}
    </div>
  );
};

export default BlogsTable;
