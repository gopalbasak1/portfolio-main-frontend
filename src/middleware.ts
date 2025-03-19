export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/usersInfo",
    "/dashboard/project/createProject",
    "/dashboard/project/allProject",
    "/dashboard/blog/createBlog",
    "/dashboard/blog/allBlog",
    "/dashboard/message",
  ],
};
