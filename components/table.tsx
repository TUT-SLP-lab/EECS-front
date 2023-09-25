import { useGetDeskData } from "@/hooks/useGetDeskData";
import { Rect, Text } from "react-konva";

interface Props {
    deskData: DeskDataType;
  index: number;
}

export default function Table({ deskData, index }: Props) {
    const {changeDeskData} = useGetDeskData();

    const handleClick = (e:any,key:number) => {
        changeDeskData(key,"aaa")
    }
    console.log(deskData)
  return (
    <>
      <Rect x={deskData.position.x} y={deskData.position.y} height={deskData.size.y} width={deskData.size.x} fill="yellow" onClick={(e) => handleClick(e,index)} />
      {deskData.username != undefined ? (
        // <Text
        //   text={deskData.username}
        //   x={deskData.position.x + deskData.size.x / 2}
        //   y={deskData.position.y + deskData.size.y / 2}
        //   rotation={-90}
        // ></Text>
        console.log("test")
      ) : (
        <></>
      )}
    </>
  );
}
