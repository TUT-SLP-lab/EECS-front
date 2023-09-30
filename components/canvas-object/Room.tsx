import { Arc, Group, Layer, Rect, Stage } from "react-konva";
import React from "react";
import Table from "./Table";
import Konva from "konva";

interface Props {
  roomNumber: string;
  deskDatas: DeskDataType[];
  width: number;
  height: number;
  changeSitDesk: (id: string) => void;
  changeStandDesk: (id: string) => void;
  openModal: () => void;
  targetDesk: (desk_id: string) => void;
}

export default function Room({
  roomNumber,
  deskDatas,
  width,
  height,
  changeSitDesk,
  changeStandDesk,
  openModal,
  targetDesk,
}: Props) {
  const stageRef = React.useRef<Konva.Stage>(null);

  const calcBound = (pos: { x: number; y: number }) => {
    const div = document.querySelector("#room") as HTMLDivElement;
    const roomWidth = div.clientWidth;
    const roomHeight = div.clientHeight;
    const x = Math.min(Math.max(pos.x, roomWidth - width), 0);
    const y = Math.min(Math.max(pos.y, roomHeight - height), 0);
    return { x, y };
  };
  const handleDragBound = (pos: { x: number; y: number }) => {
    // 排他制御のため、#roomを左上にスクロール
    const div = document.querySelector("#room") as HTMLDivElement;
    div.scrollLeft = 0;
    div.scrollTop = 0;
    return calcBound(pos);
  };
  const handleScroll = () => {
    if (!stageRef.current) return;
    // 排他制御のため、canvasを左上にスクロール
    stageRef.current.position({ x: 0, y: 0 });
  };
  return (
    <div className="overflow-scroll" onScroll={handleScroll} id="room">
      <Stage
        width={width}
        height={height}
        draggable
        dragBoundFunc={handleDragBound}
        ref={stageRef}
      >
        <Layer>
          <Group width={width} height={height}>
            {/* 部屋の枠 */}
            <Rect stroke="black" width={width} height={height} />
            {/* ドア */}
            <Arc
              x={20}
              innerRadius={0}
              outerRadius={80}
              angle={90}
              stroke="black"
              strokeWidth={1}
            />
            {deskDatas.map((deskData, index) =>
              deskData.room == roomNumber ? (
                <Table
                  deskData={deskData}
                  changeSitDesk={changeSitDesk}
                  changeStandDesk={changeStandDesk}
                  openModal={openModal}
                  targetDesk={targetDesk}
                  key={index}
                />
              ) : (
                <React.Fragment key={index}></React.Fragment>
              )
            )}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
