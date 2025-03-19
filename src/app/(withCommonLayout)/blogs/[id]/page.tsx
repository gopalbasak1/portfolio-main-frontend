import BlogDetails from "@/components/shared/Blogs/BlogDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`);

  const blog = await res.json();

  return {
    title: `Blog Details- ${blog?.data?.title}` || "Blog Details",
    description: blog?.data?.description || "Blog description not available",
  };
}

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  //console.log(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${id}`,
    {
      cache: "no-store",
    }
  );
  const blogData = await res.json();

  const blog = blogData.data;

  console.log(blogData);
  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
