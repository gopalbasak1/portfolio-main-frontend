import Header from "@/components/shared/Header";
import StairTransition from "@/components/shared/StairTransition";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const CommonLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Header session={session} />
      <StairTransition />
      {children}
    </div>
  );
};

export default CommonLayout;
