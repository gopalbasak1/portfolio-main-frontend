"use server";
import BlogsTable from "@/components/shared/BlogsTable";
import { getAllBlogByAdmin } from "@/services/blog";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const AllBlog = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllBlogByAdmin(page);

  console.log(data);

  return (
    <div className="p-4 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {data.length > 0 ? (
        <BlogsTable blogs={data} meta={meta} />
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default AllBlog;
