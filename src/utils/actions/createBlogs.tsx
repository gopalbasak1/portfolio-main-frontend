"use server";

import { BlogData } from "@/components/shared/BlogForm";
import { toast } from "sonner";

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

export const createBlog = async (
  data: BlogData,
  userId: string,
  token: string
) => {
  console.log(data, userId, token);
  if (!token) {
    console.error("❌ No token found, user is unauthorized.");
    return { success: false, message: "Unauthorized" };
  }
  const formattedData = {
    title: data?.title, // ✅ Ensure it's a string
    content: data?.content, // ✅ Ensure it's a string
    category: data?.category, // ✅ Ensure it's a string
    image: data?.image || "", // ✅ Ensure image URL is a string
    userId: userId,
  };

  console.log("📤 Sending data:", formattedData); // Debugging

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/create-blog`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Attach token
      },
      body: JSON.stringify(formattedData), // ✅ Ensure JSON matches backend schema
    }
  );

  const blogData = await res.json();
  console.log("📥 Backend response:", blogData); // Debugging

  return blogData;
};
