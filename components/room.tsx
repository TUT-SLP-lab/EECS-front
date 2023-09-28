import { Layer, Rect, Stage } from "react-konva";
import Table from "./table";
import React from "react";

interface Props {
  roomNumber: string;
  deskDatas: DeskDataType[];
  changeSitDesk: (id: string) => void;
  changeStandDesk: (id: string) => void;
  changeOldDesk: (name: string) => void;
  openModal: () => void;
  targetDesk: (desk_id: string) => void;
}

export default function Room({
  roomNumber,
  deskDatas: deskDatas,
  changeSitDesk,
  changeStandDesk,
  changeOldDesk,
  openModal,
  targetDesk,
}: Props) {
  console.log(deskDatas);
  return (
    <>
      <Stage height={740} width={640}>
        <Layer>
          <Rect
            stroke="black"
            strokeWidth={4}
            x={0}
            y={0}
            width={640}
            height={740}
          />
          {deskDatas.map((deskData, index) =>
            deskData.room == roomNumber ? (
              <Table
                deskData={deskData}
                changeSitDesk={changeSitDesk}
                changeStandDesk={changeStandDesk}
                changeOldDesk={changeOldDesk}
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
    </>
  );
}
