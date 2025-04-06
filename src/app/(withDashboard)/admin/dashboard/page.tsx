import BlogChart from "@/components/modules/chart/BlogChart";
import ProjectChart from "@/components/modules/chart/ProjectChart";
import UserChart from "@/components/modules/chart/UserChart";
import { getAllBlogByAdmin } from "@/services/blog";
import { getAllProjectsByAdmin } from "@/services/project";
import { getAllUsersByAdmin } from "@/services/user";

const DashboardPage = async () => {
  const { data: userData } = await getAllUsersByAdmin();
  //console.log(data);

  const { data: projectData } = await getAllProjectsByAdmin();
  //console.log(projectData);

  const { data: blogData } = await getAllBlogByAdmin();
  //console.log(blogData);

  return (
    <div className="container mx-auto">
      {/* User */}
      <div className="my-10 space-y-5">
        <h2 className="text-4xl font-medium text-center">User Chart</h2>
        <UserChart userData={userData} />
      </div>

      {/* Project */}
      <div className="space-y-5 my-10">
        <div className="flex flex-row items-center gap-4">
          {/* Left Vertical Divider */}
          <div className="flex-1 border-b-2 border-gray-400 "></div>

          {/* Text */}
          <div className="text-4xl font-medium">Project</div>

          {/* Right Horizontal Divider */}
          <div className="flex-1 border-b-2 border-gray-400"></div>
        </div>
        <div className="flex gap-2 border-2 w-[230px] h-[70px] justify-center items-center border-accent text-xl rounded-xl">
          <h3>Total project: </h3>
          <p>{projectData.length}</p>
        </div>
        <div>
          <ProjectChart projectData={projectData} />
        </div>
      </div>

      {/* Blog */}
      <div className="space-y-5 my-10">
        <div className="flex flex-row items-center gap-4">
          {/* Left Vertical Divider */}
          <div className="flex-1 border-b-2 border-gray-400 "></div>

          {/* Text */}
          <div className="text-4xl font-medium">Blog</div>

          {/* Right Horizontal Divider */}
          <div className="flex-1 border-b-2 border-gray-400"></div>
        </div>
        <div className="flex gap-2 border-2 w-[230px] h-[70px] justify-center items-center border-accent text-xl rounded-xl">
          <h3>Total Blog: </h3>
          <p>{blogData.length}</p>
        </div>
        <div>
          <BlogChart blogData={blogData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
