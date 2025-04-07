import BlogDetails from "@/components/shared/Blogs/BlogDetails";
import { getSingleBlog } from "@/services/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getSingleBlog(id);

  console.log(res);

  return {
    title: `Blog Details- ${res?.data?.title}` || "Blog Details",
    description: res?.data?.description || "Blog description not available",
  };
}

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: blog } = await getSingleBlog(id);
  //console.log(blog);
  // const blog = blogData.data;

  // console.log(blogData);
  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
