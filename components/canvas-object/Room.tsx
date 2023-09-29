import { Arc, Layer, Rect, Stage } from "react-konva";
import React from "react";
import Table from "./Table";

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
  return (
    <Stage height={height} width={width}>
      <Layer>
        <Rect
          stroke="black"
          strokeWidth={4}
          x={0}
          y={0}
          width={width}
          height={height}
        />
        {/* ドア */}
        <Arc
          x={20}
          y={0}
          innerRadius={0}
          outerRadius={80}
          angle={90}
          stroke="black"
          strokeWidth={2}
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
      </Layer>
    </Stage>
  );
}
