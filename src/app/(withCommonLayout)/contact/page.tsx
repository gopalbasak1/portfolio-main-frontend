import CreateMessage from "@/components/shared/Message/CreateMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gopal Basak | Contact - Let's Connect",
  description:
    "Get in touch with Gopal Basak, a passionate mern developer. Reach out via email, phone, or the contact form for collaboration, project inquiries, or networking.",
  keywords: [
    "Gopal Basak Contact",
    "Frontend Developer Contact",
    "React Developer Bangladesh",
    "Hire React Developer",
    "Contact Gopal Basak",
    "Web Developer Contact",
    "Programming Hero Developer",
    "gopalbasak2324@gmail.com",
    "message to gopal basak",
  ],
  openGraph: {
    title: "Contact | Gopal Basak - React Developer",
    description:
      "Send a message to Gopal Basak using the contact form or reach out directly via email or phone. Let’s build something amazing together!",
    url: "https://your-portfolio-url.com/contact",
    siteName: "Gopal Basak Portfolio",
    images: [
      {
        url: "https://your-portfolio-url.com/og-contact.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Contact Gopal Basak",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Gopal Basak",
    description:
      "Have a question or idea? Get in touch with Gopal Basak today.",
    images: ["https://your-portfolio-url.com/og-contact.jpg"], // Replace with actual
    creator: "@yourTwitterHandle", // Optional
  },
};

const ContactPage = async () => {
  return (
    <div>
      <CreateMessage />
    </div>
  );
};

export default ContactPage;
