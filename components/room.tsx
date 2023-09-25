import { Layer, Rect, Stage } from "react-konva";
import Table from "./table";

interface Props {
  roomNumber: string;
  deskData: DeskDataType[];
  changeDeskData: (id: string, name: string) => void;
}

export default function Room({ roomNumber, deskData, changeDeskData }: Props) {
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
                changeDeskData={changeDeskData}
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
