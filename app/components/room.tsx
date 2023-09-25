import { Layer, Rect, Stage } from "react-konva";
import Table from "./table";

interface Props {
  roomNumber: string;
  deskData: DeskDataType[];
}

export default function Room({ roomNumber, deskData }: Props) {
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
            deskData.roomID == roomNumber ? (
              <Table
                x={deskData.locateX}
                y={deskData.locateY}
                height={deskData.deskHeight}
                width={deskData.deskWidth}
                name={deskData.username}
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
