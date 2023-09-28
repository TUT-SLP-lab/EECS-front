import { useModalState } from "@/hooks/useModalState";
import { use, useState } from "react";
import Modal from "../modal";
import Room from "../room";
import { useDeskState } from "@/hooks/useDeskState";

export const DeskView = () => {
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [changeDeskID, setChangeDeskID] = useState("");
  const { deskDatas, changeSitDesk, changeStandDesk, changeOldDesk } =
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
      <div>机を配置する</div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        changeDeskID={changeDeskID}
        changeSitDesk={changeSitDesk}
      />
      {/* <ModalButton>モーダルを開く</ModalButton> */}
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
      <div>{roomID}</div>
      <Room
        roomNumber={roomID}
        deskDatas={deskDatas}
        changeSitDesk={changeSitDesk}
        changeStandDesk={changeStandDesk}
        changeOldDesk={changeOldDesk}
        openModal={openModal}
        targetDesk={targetDesk}
      />
    </div>
  );
};
