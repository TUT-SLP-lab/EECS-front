import Room from "@/components/room";
import { useGetDeskData } from "@/hooks/useGetDeskData";
import { useState } from "react";

export default function Content() {
  const [roomNumber, setRoomNumber] = useState("F-301");
  const { deskData, setDeskData, changeDeskData } = useGetDeskData();

  console.log(deskData)

  const handleClick = (e:any) => {
    setRoomNumber(e.target.value)
    changeDeskData(0,"aaa");
  }
  return (
    <div>
      <div>机を配置する</div>
      <button
        type="submit"
        onClick={handleClick}
        className="bg-gray-300 flex-1 rounded m-1 p-1"
        value={"F-301"}
      >
        F-301
      </button>
      <button
        type="submit"
        onClick={handleClick}
        className="bg-gray-300 flex-1 rounded m-1 p-1"
        value={"F-310"}
      >
        F-310
      </button>
      <div>{roomNumber}</div>
      <Room roomNumber={roomNumber} deskData={deskData}/>
    </div>
  );
}
