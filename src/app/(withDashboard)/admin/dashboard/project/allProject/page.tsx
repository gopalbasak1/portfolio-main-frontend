"use server";
import ProjectsTable from "@/components/shared/ProjectsTable";
import { getAllProjectsByAdmin } from "@/services/project";

const AllProject = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllProjectsByAdmin(page);
  //console.log(data, meta);

  return (
    <div className="p-4 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">All Projects</h1>

      <ProjectsTable projects={data} meta={meta} />
    </div>
  );
};

export default AllProject;
