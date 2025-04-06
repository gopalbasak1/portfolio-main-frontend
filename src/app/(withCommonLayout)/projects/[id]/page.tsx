import ProjectsDetails from "@/components/shared/ProjectsDetails";
import { getSingleProject } from "@/services/project";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`
//   );

//   const project = await res.json();

//   return {
//     title: `Project Details- ${project?.data?.title}` || "Project Details",
//     description: project?.description || "Project description not available",
//   };
// }

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  //console.log(id);
  const { data: project } = await getSingleProject(id);

  return (
    <div>
      <ProjectsDetails project={project} />
    </div>
  );
};

export default ProjectDetailsPage;
