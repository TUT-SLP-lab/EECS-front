import { useGetDeskData } from "@/hooks/useGetDeskData";
import { Rect, Text } from "react-konva";

interface Props {
  deskData: DeskDataType;
  changeDeskData: (id: string, name: string) => void;
}

export default function Table({ deskData, changeDeskData }: Props) {
  const handleClick = (e: any, id: string) => {
    changeDeskData(id, "aaa");
  };
  return (
    <>
      <Rect
        x={deskData.position.x}
        y={deskData.position.y}
        height={deskData.size.y}
        width={deskData.size.x}
        fill="yellow"
        onClick={(e) => handleClick(e, deskData.desk_id)}
      />
      {deskData.username != undefined ? (
        <Text
          text={deskData.username}
          x={deskData.position.x + deskData.size.x / 2}
          y={deskData.position.y + deskData.size.y / 2}
          rotation={-90}
        ></Text>
      ) : (
        <></>
      )}
    </>
  );
}
