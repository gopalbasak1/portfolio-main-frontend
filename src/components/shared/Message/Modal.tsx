// components/Modal.tsx
import { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  message: string;
  closeModal: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, message, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#111827] p-6 rounded-lg w-96">
        <h2 className="text-2xl mb-4 underline">Full Message</h2>
        <p className="text-sm text-gray-400 mb-4">{message}</p>
        <button
          onClick={closeModal}
          className="px-4 py-1  bg-accent text-black rounded hover:bg-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
