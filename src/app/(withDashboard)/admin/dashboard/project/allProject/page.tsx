import ProjectsTable from "@/components/shared/ProjectsTable";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const AllProject = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    return <p className="text-red-500">Failed to load projects</p>;
  }

  const projectInfo = await res.json();

  return (
    <div className="p-4 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">All Projects</h1>
      {projectInfo.data.length > 0 ? (
        <ProjectsTable session={session} projects={projectInfo.data} />
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default AllProject;
