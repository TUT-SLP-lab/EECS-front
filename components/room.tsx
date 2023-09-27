import { Layer, Rect, Stage } from "react-konva";
import Table from "./table";
import React from "react";

interface Props {
  roomNumber: string;
  deskData: DeskDataType[];
  changeSitDesk: (id: string, email: string, name: string) => void;
  changeStandDesk: (id: string) => void;
  changeOldDesk: (name: string) => void;
  openModal: () => void;
  targetDesk: (desk_id: string) => void;
}

export default function Room({
  roomNumber,
  deskData,
  changeSitDesk,
  changeStandDesk,
  changeOldDesk,
  openModal,
  targetDesk
}: Props) {
  return (
    <>
      <Stage height={1000} width={1000}>
        <Layer>
          <Rect
            stroke="black"
            strokeWidth={4}
            x={1}
            y={1}
            width={999}
            height={999}
          />
          {deskData.map((deskData, index) =>
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
