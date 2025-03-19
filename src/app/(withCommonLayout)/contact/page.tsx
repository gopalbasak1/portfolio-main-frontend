/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import CreateMessage from "@/components/shared/Message/CreateMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gopal Basak | Contact",
};

const ContactPage = async () => {
  const session = await getServerSession(authOptions);

  // Ensure session.user contains id and accessToken
  const customSession = session
    ? {
        ...session,
        user: {
          ...session.user,
          id: (session as any).user?.id || "",
          accessToken: (session as any).user?.accessToken || "",
        },
      }
    : null;

  return (
    <div>
      <CreateMessage session={customSession} />
    </div>
  );
};

export default ContactPage;
