import { Rect, Text } from "react-konva";

interface Props {
  deskData: DeskDataType;
  changeSitDesk: (id: string, email: string, name: string) => void;
  changeStandDesk: (id: string) => void;
}

export default function Table({
  deskData,
  changeSitDesk,
  changeStandDesk,
}: Props) {
  const handleClick = (e: any) => {
    const name: string = "aaa";
    const email: string = "aaa@eecs";
    if (deskData.username == undefined) {
      changeSitDesk(deskData.desk_id, email, name);
    } else if (deskData.username == name) {
      changeStandDesk(deskData.desk_id);
    }
  };
  return (
    <>
      <Rect
        x={deskData.position.x}
        y={deskData.position.y}
        height={deskData.size.y}
        width={deskData.size.x}
        fill="yellow"
        onClick={handleClick}
        stroke="black"
        strokeWidth={1}
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
