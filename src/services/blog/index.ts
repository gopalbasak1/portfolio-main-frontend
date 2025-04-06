"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addBlog = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/create-Blog`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
      }
    );
    revalidateTag("BLOG");
    return await res.json();
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllBlogByAdmin = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.rentalAmount) {
    params.append("minAmount", "0");
    params.append("maxAmount", query?.rentalAmount.toString());
  }

  if (query?.category) {
    params.append("category", query?.category.toString());
  }

  // if (query?.category) {
  //   params.append("category", query?.category.toString());
  // }

  const accessToken = (await cookies()).get("accessToken")?.value || "";

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/blogs?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["BLOG"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteBlogByAdmin = async (blogId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("BLOG");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlogByAdmin = async (blogData: any, blogId: string) => {
  try {
    // Get the access token from local storage (or manage it in state)
    const accessToken = (await cookies()).get("accessToken")?.value || "";

    if (!accessToken) {
      throw new Error("No access token found.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogId}`,
      {
        method: "PUT",
        body: JSON.stringify(blogData),
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    revalidateTag("BLOG");
    return res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
};

export const getSingleBlog = async (blogId: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogId}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["BLOG"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
