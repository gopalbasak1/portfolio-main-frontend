import LatestBlogs from "@/components/shared/Blogs/LatestBlogs";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
    next: { revalidate: 30 }, // Cache for 30 seconds
  });

  const blogData = await res.json();
  const blogs = blogData?.data || [];

  return {
    title: `Blogs | ${blogs.length > 0 ? blogs[0]?.title : "Latest Articles"}`,
    description: `Read our latest blogs on technology, development, and trends. Featuring: ${
      blogs.length > 0 ? blogs[0]?.title : "Exciting new articles"
    }.`,
    openGraph: {
      title: `Blogs | ${
        blogs.length > 0 ? blogs[0]?.title : "Latest Articles"
      }`,
      description: `Stay updated with our latest blogs on web development, JavaScript, and React.`,
      images: blogs.length > 0 ? [{ url: blogs[0]?.thumbnail }] : [],
    },
  };
}

const Blogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`, {
    cache: "no-store",
  });
  const blogData = await res.json();
  const blogs = blogData?.data;

  return (
    <div className="my-10 container mx-auto">
      <LatestBlogs blogs={blogs} />
    </div>
  );
};

export default Blogs;
