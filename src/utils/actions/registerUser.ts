"use server";

import { UserData } from "@/app/register/page";

export const registerUser = async (data: UserData) => {
  const formattedData = {
    user: {
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image || "", // Ensure image is a string
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData), // ✅ Sending the `user` object
      cache: "no-store",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
