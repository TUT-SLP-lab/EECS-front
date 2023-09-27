// components/Modal.js
import { useGetWindowSize } from "@/hooks/useGetWindowSize";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  changeDeskID: string;
  changeSitDesk: (id: string) => void;
}

const Modal = ({ isOpen, onClose, changeDeskID, changeSitDesk }: Props) => {
  const windowSize = useGetWindowSize();

  const changeDesk = () => {
    changeSitDesk(changeDeskID)
    onClose()
  }

  if (!isOpen) return null;

  return createPortal(
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"'>
      <Stage width={windowSize.width} height={windowSize.height}>
        <Layer>
          {/* モーダルの背景 */}
          {console.log("test")}
          <Rect
            x={0}
            y={0}
            width={windowSize.width}
            height={windowSize.height}
            fill="rgba(0, 0, 0, 0.5)"
            onClick={onClose}
          />

          {/* モーダル本体 */}
          <Rect
            x={windowSize.width / 4}
            y={windowSize.height / 4}
            width={400}
            height={100}
            fill="white"
            shadowBlur={10}
            cornerRadius={10}
          />

          {/* モーダル内のコンテンツ */}
          <Text
            x={windowSize.width / 4 + 20}
            y={windowSize.height / 4 + 20}
            text="本当に上書きしてもよろしいですか？"
            fontSize={20}
            fill="black"
          />
          <Rect
            x={windowSize.width / 4 + 90}
            y={windowSize.height / 4 + 50}
            width={80}
            height={40}
            fill="silver"
            onClick={changeDesk}
            >
          </Rect>
          <Text
            x={windowSize.width / 4 + 120}
            y={windowSize.height / 4 + 70}
            text="はい"
            fontSize={20}
            fill="black"
            >
          </Text>
          <Rect
            x={windowSize.width / 4 + 220}
            y={windowSize.height / 4 + 50}
            width={80}
            height={40}
            fill="silver"
            onClick={onClose}
            >
          </Rect>
        </Layer>
      </Stage>
    </div>,
    document.body // この要素にモーダルをレンダリング
  );
};

export default Modal;
