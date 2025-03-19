import Sidebar from "@/components/shared/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gopal | Portfolio | Dashboard",
  description:
    "Create Projects, Blogs, Gets all Projects, Blogs, Users, and Messages",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen  flex flex-col md:flex-row">
      {/* Sidebar (Collapsible on small screens) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0 p-4">
        <div className="rounded-xl   ">{children}</div>
      </div>
    </div>
  );
}
