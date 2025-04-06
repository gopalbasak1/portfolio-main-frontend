/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import UpdateProjectModal from "./UpdateProjectModal";
import { IMeta, TProject } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { PFTable } from "../ui/core/PFTable";
import TablePagination from "../ui/core/PFTable/TablePagination";
import { Trash } from "lucide-react";
import ProjectDeleteModal from "../ui/core/Modal/ProjectDeleteModal";
import { deleteProjectByAdmin } from "@/services/project";

const ProjectsTable = ({
  projects,
  meta,
}: {
  projects: TProject[];
  meta: IMeta;
}) => {
  // console.log(projects);
  const router = useRouter();

  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDelete = (data: TProject) => {
    console.log(data);
    setSelectedIds([data?._id]);
    setSelectedItem(data?.title);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedIds) {
        const res = await deleteProjectByAdmin(selectedIds[0]);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUpdate = (project: TProject) => {
    setSelectedProject(project);
    setUpdateModalOpen(true);
  };

  const columns: ColumnDef<TProject>[] = [
    {
      id: "sl",
      header: "Sl No.",
      cell: ({ row }) => {
        const serialNumber = (meta.page - 1) * meta.limit + row.index + 1;
        return <span>{serialNumber}</span>;
      },
      //*   (2 - 1) * 10 + 0 + 1 = 10 + 1 = 11
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <span>{row.original.title}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const shortDescription =
          row.original.description.length > 10
            ? row.original.description.slice(0, 20) + " ..."
            : row.original.description;

        return <span>{shortDescription}</span>;
      },
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const [isPreviewOpen, setIsPreviewOpen] = useState(false);

        const imageUrl =
          Array.isArray(row.original.imageUrls) &&
          row.original.imageUrls.length > 0
            ? row.original.imageUrls[0] // ✅ Use the first valid image
            : "/placeholder-image.jpg"; // ✅ Provide a fallback image

        //**
        // Checks if row.original.imageUrls is an array and has at least one image. (  const imageUrl =
        //   Array.isArray(row.original.imageUrls) &&
        //   row.original.imageUrls.length > 0)
        // If true, it uses the first image.(
        //         ? row.original.imageUrls[0] // ✅ Use the first valid image
        //         : "/placeholder-image.jpg"; // ✅ Provide a fallback image
        // )
        // If row.original.imageUrls contains images, it selects the first one:
        // 👉 row.original.imageUrls[0]
        // Otherwise, it sets a default fallback image:
        // 👉 "/placeholder-image.jpg"
        // Ensures the imageUrl is a valid absolute URL:
        // ✅ Starts with "http" → Likely an external URL.
        // ✅ Starts with "/" → A local image path.
        //
        // */
        // ✅ Ensure imageUrl is a valid absolute URL
        const validImageUrl =
          imageUrl.startsWith("http") || imageUrl.startsWith("/")
            ? imageUrl
            : "/placeholder-image.jpg"; // Fallback if invalid

        return (
          <div className="relative">
            {/* Small Thumbnail */}
            <Image
              src={validImageUrl}
              alt="Project Image"
              width={40}
              height={40}
              className="w-10 h-10 rounded-md object-cover cursor-pointer"
              onMouseEnter={() => setIsPreviewOpen(true)} // Open preview
            />

            {/* Fullscreen Preview */}
            {isPreviewOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                onClick={() => setIsPreviewOpen(false)} // Close on click
              >
                <Image
                  src={validImageUrl}
                  alt="Preview"
                  width={1920}
                  height={1080}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "liveLink",
      header: "Live Link",
      cell: ({ row }) => (
        <span>
          {row.original.liveLink && (
            <a
              href={row.original.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-accent"
            >
              View
            </a>
          )}
        </span>
      ),
    },

    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div>
          <button
            onClick={() => handleUpdate(row.original)}
            className="text-yellow-400 hover:text-yellow-500 mr-2"
          >
            <FaEdit className="w-5 h-5 hover:text-red-500" />
          </button>
          <button onClick={() => handleDelete(row.original)}>
            <Trash className="w-5 h-5 text-accent hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PFTable columns={columns} data={projects || []} />
      <TablePagination totalPage={meta?.totalPage} />
      {/* Update Project Modal */}

      {updateModalOpen && selectedProject && (
        <UpdateProjectModal
          project={selectedProject} // Fix: Passing correct prop name
          onClose={() => setUpdateModalOpen(false)}
          router={router}
        />
      )}

      {/* Deleted Project Modal */}
      <ProjectDeleteModal
        title={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProjectsTable;
