/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Modal from "@/components/shared/Message/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface User {
  image?: string;
  name?: string;
  email?: string;
  isDeleted?: boolean;
}

interface Message {
  _id: string;
  user?: User;
  message: string;
  createdAt: string;
  email: string;
  isRead?: boolean; // Track if the message is read
}

interface MessagesResponse {
  data: Message[];
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // Track unread messages

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages`,
          {
            next: {
              revalidate: 30,
            },
          }
        );
        const data: MessagesResponse = await res.json();

        // Sort messages by createdAt (latest first)
        const sortedMessages = data.data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMessages(sortedMessages);

        // Count unread messages
        const unreadMessages = sortedMessages.filter(
          (msg) => !msg.isRead
        ).length;
        setUnreadCount(unreadMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Function to mark messages as read when opened
  const openModal = (messageId: string, message: string) => {
    setSelectedMessage(message);
    setIsModalOpen(true);

    // Update message state to mark it as read
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId ? { ...msg, isRead: true } : msg
      )
    );

    // Decrease unread count
    setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen  text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Messages</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border  border-gray-700 rounded-lg">
          <thead className="bg-gray-800 text-white ">
            <tr>
              <th className="p-3 text-left border ">Sl</th>
              <th className="p-3 text-left border ">Image</th>
              <th className="p-3 text-left border ">Sender Email</th>
              <th className="p-3 text-left border ">Message</th>
              <th className="p-3 text-left border ">Date</th>
              <th className="p-3 text-left border ">User Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <tr
                  key={msg._id}
                  className={`border-b border-gray-700 hover:bg-gray-800 ${
                    msg.isRead ? "opacity-50 cursor-pointer" : "cursor-p"
                  }`}
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            width={40}
                            height={40}
                            src={msg.user?.image || "/default-avatar.png"}
                            alt={msg.user?.name || ""}
                            className="w-10 h-10 rounded-full border border-gray-600 cursor-pointer"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">
                            {msg?.user?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {msg?.user?.email || "No email"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="p-3 border">
                    <span className="font-medium">{msg?.email}</span>
                  </td>
                  <td className="p-3 max-w-[250px] border ">
                    {msg.message.length > 20 ? (
                      <>
                        {msg.message.slice(0, 20)}...
                        <button
                          onClick={() => openModal(msg._id, msg.message)}
                          className="text-blue-400 hover:underline ml-2"
                        >
                          View More
                        </button>
                      </>
                    ) : (
                      msg.message
                    )}
                  </td>
                  <td className="p-3 text-gray-400 border ">
                    <span className="block text-sm">
                      {formatDistanceToNow(new Date(msg.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {format(new Date(msg.createdAt), "yyyy-MM-dd HH:mm:ss")}
                    </span>
                  </td>
                  <td
                    className={`p-3 font-semibold border ${
                      msg.user?.isDeleted ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {msg.user?.isDeleted ? "Active" : "Deleted"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-5 text-gray-400">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for showing full message */}
      <Modal
        isOpen={isModalOpen}
        message={selectedMessage || ""}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AdminMessages;
