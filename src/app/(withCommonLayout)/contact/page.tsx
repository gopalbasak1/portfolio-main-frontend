import CreateMessage from "@/components/shared/Message/CreateMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gopal Basak | Contact",
};

const ContactPage = async () => {
  return (
    <div>
      <CreateMessage />
    </div>
  );
};

export default ContactPage;
