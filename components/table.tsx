import { useSessionState } from "@/hooks/useSessionState";
import { Group, Rect, Text } from "react-konva";

interface Props {
  deskData: DeskDataType;
  changeSitDesk: (id: string) => void;
  changeStandDesk: (id: string) => void;
  openModal: () => void;
  targetDesk: (desk_id: string) => void;
}

export default function Table({
  deskData,
  changeSitDesk,
  changeStandDesk,
  openModal,
  targetDesk,
}: Props) {
  const authName = useSessionState().sessionData?.getIdToken().payload.name;
  const handleClick = (e: any) => {
    if (deskData.username == undefined || deskData.username == " ") {
      changeSitDesk(deskData.desk_id);
    } else if (deskData.username == authName) {
      changeStandDesk(deskData.desk_id);
    } else {
      targetDesk(deskData.desk_id);
      openModal();
    }
  };
  return (
    <Group onClick={handleClick} onTap={handleClick}>
      <Rect
        x={deskData.position.x}
        y={deskData.position.y}
        height={deskData.size.y}
        width={deskData.size.x}
        fill="#fff3b8"
        stroke="black"
        strokeWidth={1}
      />
      {deskData.username != undefined ? (
        deskData.size.x > deskData.size.y ? (
          <Text
            text={deskData.username}
            x={deskData.position.x}
            y={deskData.position.y}
            width={deskData.size.x}
            height={deskData.size.y}
            rotation={0}
            align="center"
            verticalAlign="middle"
          />
        ) : (
          <Text
            text={deskData.username}
            x={deskData.position.x}
            y={deskData.position.y + deskData.size.y}
            width={deskData.size.y}
            height={deskData.size.x}
            rotation={-90}
            align="center"
            verticalAlign="middle"
          />
        )
      ) : (
        <></>
      )}
    </Group>
  );
}
