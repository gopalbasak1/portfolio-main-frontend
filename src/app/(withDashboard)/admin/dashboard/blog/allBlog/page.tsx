import BlogsTable from "@/components/shared/BlogsTable";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const AllBlog = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load blogs</p>;
  }

  const blogInfo = await res.json();

  return (
    <div className="p-4 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {blogInfo.data.length > 0 ? (
        <BlogsTable session={session} blogs={blogInfo.data} />
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default AllBlog;
