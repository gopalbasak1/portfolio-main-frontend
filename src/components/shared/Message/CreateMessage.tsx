/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Session } from "next-auth";
import { sendMessage } from "@/services/message";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+88) 01747 065084",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: (
      <a
        href="mailto:gopalbasak2324@gmail.com"
        className="hover:underline hover:text-accent"
      >
        gopalbasak2324@gmail.com
      </a>
    ),
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "Kishoreganj, Bangladesh - 2300",
  },
];

const CreateMessage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });

  // State for loading & response message
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await sendMessage(formData);
      console.log(response);
      if (response.success) {
        setResponseMessage("Message sent successfully!");
        toast.success(response?.message);
        setFormData({
          name: "",
          email: "",
          message: "",
          phoneNumber: "",
        });
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      console.error("Error sending message:", error);

      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }

    setLoading(false);
  };
  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
        }}
        className="py-6 "
      >
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row gap-[30px]">
            {/* Form */}
            <div className="xl:w-[54%] order-2 xl:order-none ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl "
              >
                <h3 className="text-4xl text-accent">Let's work together</h3>
                <p className="text-white/60">
                  Feel free to reach out to us with your queries and
                  suggestions.
                </p>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    className="rounded-xl bg-[#181818]"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    className="rounded-xl bg-[#181818]"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  className="rounded-xl bg-[#181818]"
                  type="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

                {/* Textarea */}
                <Textarea
                  className="h-[200px] bg-[#181818]"
                  name="message"
                  placeholder="Type your message here."
                  value={formData?.message}
                  onChange={handleChange}
                  required
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="bg-accent text-[#27272c]"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
              <ul className="flex flex-col gap-10">
                {info.map((item, index) => (
                  <li className="flex items-center gap-6 " key={index}>
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center ">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="fle1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CreateMessage;
