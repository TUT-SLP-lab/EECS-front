import { Rect, Text } from "react-konva";

interface Props {
  deskData: DeskDataType;
  changeSitDesk: (id: string) => void;
  changeStandDesk: (id: string) => void;
  changeOldDesk: (name: string) => void;
  openModal: () => void;
  targetDesk: (desk_id: string) => void;
  authName: string;
}

export default function Table({
  deskData,
  changeSitDesk,
  changeStandDesk,
  changeOldDesk,
  openModal,
  targetDesk,
  authName
}: Props) {
  const handleClick = (e: any) => {
    if (deskData.username == undefined) {
      changeSitDesk(deskData.desk_id);
    } else if (deskData.username == authName) {
      changeStandDesk(deskData.desk_id);
    }else{
      targetDesk(deskData.desk_id)
      openModal()
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
