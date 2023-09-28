import { useGetWindowSize } from "@/hooks/useGetWindowSize";
import React from "react";
import { createPortal } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import { InnerModalButton } from "./InnerModalButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  changeDeskID: string;
  changeSitDesk: (id: string) => void;
}

const Modal = ({ isOpen, onClose, changeDeskID, changeSitDesk }: Props) => {
  const windowSize = useGetWindowSize();

  const changeDesk = () => {
    changeSitDesk(changeDeskID);
    onClose();
  };

  if (!isOpen) return null;

  const modalStyle = {
    width: 400,
    height: 100,
    X: (windowSize.width - 400) / 2,
    Y: (windowSize.height - 200) / 2,
  };

  return createPortal(
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"'>
      <Stage width={windowSize.width} height={windowSize.height}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={windowSize.width}
            height={windowSize.height}
            fill="rgba(0, 0, 0, 0.5)"
            onClick={onClose}
            onTap={onClose}
          />

          <Rect
            x={modalStyle.X}
            y={modalStyle.Y}
            width={modalStyle.width}
            height={modalStyle.height}
            fill="white"
            shadowBlur={10}
            cornerRadius={10}
          />

          <Text
            x={modalStyle.X + 20}
            y={modalStyle.Y + 20}
            text="本当に上書きしてもよろしいですか？"
            fontSize={20}
            fill="black"
          />

          <InnerModalButton
            x={modalStyle.X + 90}
            y={modalStyle.Y + 50}
            onClick={changeDesk}
            text="はい"
          />
          <InnerModalButton
            text="いいえ"
            x={modalStyle.X + 220}
            y={modalStyle.Y + 50}
            onClick={onClose}
          />
        </Layer>
      </Stage>
    </div>,
    document.body
  );
};

export default Modal;
