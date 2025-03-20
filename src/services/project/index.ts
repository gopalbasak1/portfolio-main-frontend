"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllRentals = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.rentalAmount) {
    params.append("minAmount", "0");
    params.append("maxAmount", query?.rentalAmount.toString());
  }

  if (query?.category) params.append("category", query.category.toString());
  if (query?.holding) params.append("holding", query.holding.toString());
  if (query?.district) params.append("district", query.district.toString());
  if (query?.division) params.append("division", query.division.toString());
  if (query?.bedrooms) params.append("bedrooms", query.bedrooms.toString());
  if (query?.rentAmount)
    params.append("rentAmount", query.rentAmount.toString());

  const accessToken = (await cookies()).get("accessToken")?.value || "";

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/rental/landlords/listings?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["RENTAL"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllProjectsByAdmin = async (
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
      }/projects?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["PROJECT"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllRentalListing = async (
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

  if (query?.category) params.append("category", query.category.toString());
  if (query?.holding) params.append("holding", query.holding.toString());
  if (query?.district) params.append("district", query.district.toString());
  if (query?.division) params.append("division", query.division.toString());
  if (query?.bedrooms) params.append("bedrooms", query.bedrooms.toString());

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/rental/listings?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["RENTAL"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addProject = async (data: FieldValues) => {
  try {
    console.log("🔍 API Request Data:", data);

    // Get the access token from local storage (or manage it in state)
    const accessToken = (await cookies()).get("accessToken")?.value || "";

    if (!accessToken) {
      throw new Error("No access token found.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create-Project`,
      {
        method: "POST",
        body: JSON.stringify(data), // Ensure JSON format
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    revalidateTag("PROJECT");
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

export const updateProjectByAdmin = async (
  projectData: any,
  projectId: string
) => {
  try {
    console.log("🔍 API Request Data:", projectData, projectId);

    // Get the access token from local storage (or manage it in state)
    const accessToken = (await cookies()).get("accessToken")?.value || "";

    if (!accessToken) {
      throw new Error("No access token found.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${projectId}`,
      {
        method: "PUT",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    revalidateTag("PROJECT");
    return res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
};

// delete brand
export const deleteRentalByLandlord = async (
  rentalId: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/landlords/listings/${rentalId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("RENTAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteProjectByAdmin = async (rentalId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${rentalId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("PROJECT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleRental = async (rentalId: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/listings/${rentalId}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["RENTAL"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
