import { useModalState } from "@/hooks/useModalState";
import { useState } from "react";
import Modal from "../common/modal/modal";
import Room from "../room";
import { useDeskState } from "@/hooks/useDeskState";

export const MainView = () => {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [changeDeskID, setChangeDeskID] = useState("");
  const { deskDatas, changeSitDesk, changeStandDesk } =
    useDeskState();
  const [roomID, setRoomID] = useState("f-301");

  const targetDesk = (desk_id: string) => {
    setChangeDeskID(desk_id);
  };
  const handleClick = (e: any) => {
    setRoomID(e.target.value);
  };

  return (
    <div>
      <div>EECS</div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        changeDeskID={changeDeskID}
        changeSitDesk={changeSitDesk}
      />
      <button
        type="submit"
        onClick={handleClick}
        className="bg-gray-300 flex-1 rounded m-1 p-1"
        value={"f-301"}
      >
        F-301
      </button>
      <button
        type="submit"
        onClick={handleClick}
        className="bg-gray-300 flex-1 rounded m-1 p-1"
        value={"f-310"}
      >
        F-310
      </button>
      <Room
        roomNumber={roomID}
        deskDatas={deskDatas}
        changeSitDesk={changeSitDesk}
        changeStandDesk={changeStandDesk}
        openModal={openModal}
        targetDesk={targetDesk}
      />
    </div>
  );
};
