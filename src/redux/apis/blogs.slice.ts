import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, // ✅ Use correct env variable
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "/blogs",
    }),

    // createUser: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetAllBlogsQuery } = baseApi;
