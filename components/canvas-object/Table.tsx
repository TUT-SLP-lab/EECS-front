import { useSessionState } from "@/hooks/useSessionState";
import { Rect, Text } from "react-konva";
import { ClickableGroup } from "./ClickableGroup";

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
    <ClickableGroup
      onClick={handleClick}
      x={deskData.position.x}
      y={deskData.position.y}
    >
      <Rect
        width={deskData.size.x}
        height={deskData.size.y}
        fill="#fff3b8"
        stroke="black"
        strokeWidth={1}
      />
      {deskData.username != undefined ? (
        deskData.size.x > deskData.size.y ? (
          <Text
            text={deskData.username}
            width={deskData.size.x}
            height={deskData.size.y}
            rotation={0}
            align="center"
            verticalAlign="middle"
          />
        ) : (
          <Text
            text={deskData.username}
            // 回転に対応するため、y座標をGroup内で加算
            y={deskData.size.y}
            // 回転に対応するため、widthとheightを入れ替え
            width={deskData.size.y}
            height={deskData.size.x}
            rotation={-90} // 文字を横向きにするために-90度回転
            align="center"
            verticalAlign="middle"
          />
        )
      ) : (
        <></>
      )}
    </ClickableGroup>
  );
}
