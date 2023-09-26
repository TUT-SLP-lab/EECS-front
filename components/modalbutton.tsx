// components/ModalButton.js
import React, { ReactNode, useState } from "react";
import { Text, Stage } from "react-konva";
import Modal from "./modal";
import { useGetWindowSize } from "@/hooks/useGetWindowSize";

interface Props {
  children: ReactNode;
}

const ModalButton = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const windowSize = useGetWindowSize();

//   console.log(isOpen);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
      >
        {children}
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* モーダルに表示するコンテンツをここに追加 */}
      </Modal>
    </div>
  );
};

export default ModalButton;
