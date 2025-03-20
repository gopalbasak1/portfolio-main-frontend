"use client";

import UserDeleteModal from "@/components/ui/core/Modal/UserDeleteModal";
import { PFTable } from "@/components/ui/core/PFTable";
import TablePagination from "@/components/ui/core/PFTable/TablePagination";
import { deleteUserByAdmin } from "@/services/user";
import { IMeta, IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UserTable = ({ users, meta }: { users: IUser[]; meta: IMeta }) => {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IUser) => {
    console.log(data);
    setSelectedIds([data?._id]);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedIds) {
        const res = await deleteUserByAdmin(selectedIds[0]);
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

  const columns: ColumnDef<IUser>[] = [
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
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
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
          <Image
            src={validImageUrl}
            alt="Users Image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-md object-cover"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <span>{row.original.phoneNumber}</span>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.original.role}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`${
            row.original.status === "active" ? "text-green-400" : "text-red-400"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div>
          <button onClick={() => handleDelete(row.original)}>
            <Trash className="w-5 h-5 text-accent hover:text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PFTable columns={columns} data={users || []} />
      <TablePagination totalPage={meta?.totalPage} />
      <UserDeleteModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default UserTable;
