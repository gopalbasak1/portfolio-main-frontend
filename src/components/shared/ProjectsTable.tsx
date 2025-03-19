/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import UpdateProjectModal from "./UpdateProjectModal";
import { Project } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
// Import the modal component

type ProjectsTableProps = {
  projects: Project[];
  session: any;
};

const ProjectsTable = ({ projects, session }: ProjectsTableProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);

      const token = session?.user?.accessToken;
      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.error("Delete error:", data);
        throw new Error(data.message || "Failed to delete project");
      }

      toast.success("Project deleted successfully!");

      router.refresh();
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <ScrollArea className="w-full h-[800px] ">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-white">
          <thead className="">
            <tr>
              <th className="px-4 py-2 border ">SL</th>
              <th className="px-4 py-2 border ">Title</th>
              <th className="px-4 py-2 border ">Description</th>
              <th className="px-4 py-2 border ">Live Link</th>
              <th className="px-4 py-2 border ">Image</th>
              <th className="px-4 py-2 border ">Project By</th>
              <th className="px-4 py-2 border ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project._id} className="">
                <td className="px-4 py-2 border border-gray-600">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {project.title}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {project.description
                    ? project.description.length > 10
                      ? project.description.slice(0, 25) + "..."
                      : project.description
                    : "No description"}
                </td>

                <td className="px-4 py-2 border border-gray-600 text-center">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-accent"
                    >
                      View
                    </a>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {typeof project.image === "string" && (
                    <Image
                      width={64}
                      height={64}
                      src={project.image}
                      alt={project.title || "Project image"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {project?.user?.name}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    onClick={() => handleUpdate(project)}
                    className="text-yellow-400 hover:text-yellow-500 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Update Project Modal */}
        {isModalOpen && selectedProject && (
          <UpdateProjectModal
            project={selectedProject}
            onClose={() => setIsModalOpen(false)}
            router={router}
          />
        )}
      </div>
    </ScrollArea>
  );
};

export default ProjectsTable;
