import { Layer, Rect, Stage } from "react-konva";
import Table from "./table";

interface Props {
  roomNumber: string;
  deskData: DeskDataType[];
  changeSitDesk: (id: string, email: string, name: string) => void;
  changeStandDesk: (id: string) => void;
}

export default function Room({
  roomNumber,
  deskData,
  changeSitDesk,
  changeStandDesk,
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
                key={index}
              />
            ) : (
              <div key={index}></div>
            )
          )}
        </Layer>
      </Stage>
    </>
  );
}
