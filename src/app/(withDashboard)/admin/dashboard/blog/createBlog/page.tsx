import BlogForm from "@/components/shared/BlogForm";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const CreateBlog = async () => {
  const session = await getServerSession(authOptions);
  //console.log("p", session);
  return (
    <div>
      <BlogForm session={session} />
    </div>
  );
};

export default CreateBlog;
