import { useGetWindowSize } from "@/hooks/useGetWindowSize";
import React from "react";
import { createPortal } from "react-dom";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
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
  const modalButtonStyle = {
    width: modalStyle.width / 5,
    height: 40,
    Y: 50,
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

          <Group x={modalStyle.X} y={modalStyle.Y}>
            <Rect
              width={modalStyle.width}
              height={modalStyle.height}
              fill="white"
              shadowBlur={10}
              cornerRadius={10}
            />
            <Text
              y={20}
              width={modalStyle.width} // 中央揃えにするため、widthを指定
              text="本当に上書きしてもよろしいですか？"
              fontSize={20}
              align="center"
              fill="black"
            />
            <InnerModalButton
              x={modalButtonStyle.width}
              y={modalButtonStyle.Y}
              width={modalButtonStyle.width}
              height={modalButtonStyle.height}
              onClick={changeDesk}
              text="はい"
            />
            <InnerModalButton
              x={modalStyle.width - modalButtonStyle.width * 2}
              y={modalButtonStyle.Y}
              width={modalButtonStyle.width}
              height={modalButtonStyle.height}
              onClick={onClose}
              text="いいえ"
            />
          </Group>
        </Layer>
      </Stage>
    </div>,
    document.body
  );
};

export default Modal;
