"use server";

import { ProjectData } from "@/components/shared/ProjectForm";

import { toast } from "sonner";

export const users = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`);
  const userInfo = await res.json();
  return userInfo;
};

// ✅ Upload Image to Cloudinary
export const uploadImageToCloudinary = async (
  file: File
): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    toast.error("Image upload failed. Please try again.");
    return null;
  }
};

export const createProject = async (
  data: ProjectData,
  userId: string,
  token: string
) => {
  if (!token) {
    console.error("❌ No token found, user is unauthorized.");
    return { success: false, message: "Unauthorized" };
  }
  const formattedData = {
    title: data?.title, // ✅ Ensure it's a string
    description: data?.description, // ✅ Ensure it's a string
    liveLink: data?.liveLink, // ✅ Ensure it's a string
    image: data?.image || "", // ✅ Ensure image URL is a string
    stack: data?.stack,
    category: data?.category,
    github: data?.github,
    userId: userId,
  };

  console.log("📤 Sending data:", formattedData); // Debugging

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create-project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Attach token
      },
      body: JSON.stringify(formattedData), // ✅ Ensure JSON matches backend schema
    }
  );

  const projectData = await res.json();
  console.log("📥 Backend response:", projectData); // Debugging

  return projectData;
};

// export const deletedProjects = async (data, token) => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create-project`,
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`, // Attach token
//       },
//       body: JSON.stringify(data), // ✅ Ensure JSON matches backend schema
//     }
//   );
//   const projectData = await res.json();
//   console.log("📥 Backend response:", projectData); // Debugging

//   return projectData;
// };
