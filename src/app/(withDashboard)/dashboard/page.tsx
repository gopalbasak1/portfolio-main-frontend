import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import DashboardClient from "@/components/shared/DashboardClient";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions); // ✅ Fetch
  //console.log("des", session);
  return <DashboardClient session={session} />;
};

export default DashboardPage;
