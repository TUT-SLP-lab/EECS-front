import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import Room from "@/components/room";
import { useDeskState } from "@/hooks/useDeskState";
import { useSessionState } from "@/hooks/useSessionState";
import Modal from "@/components/modal";
import { useModalState } from "@/hooks/useModalState";

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USERPOOLWEBCLIENTID,
    oauth: {
      domain: process.env.NEXT_PUBLIC_URL,
      scope: ["email", "openid", "profile"],
      redirectSignIn: process.env.NEXT_PUBLIC_REDIRECTURI,
      responseType: "code",
    },
  },
  ssr: true,
});

async function signIn() {
  try {
    const user = await Auth.federatedSignIn({
      customProvider: process.env.NEXT_PUBLIC_CUSTOMPROVIDER ?? "",
    });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  const { sessionData, isLoading } = useSessionState();
  const [roomNumber, setRoomNumber] = useState("f-301");
  const {
    deskData,
    setDeskData,
    changeSitDesk,
    changeStandDesk,
    changeOldDesk,
  } = useDeskState();
  const { isModalOpen, openModal, closeModal } = useModalState();
  const [changeDeskID, setChangeDeskID] = useState("");

  const handleClick = (e: any) => {
    setRoomNumber(e.target.value);
  };

  const targetDesk = (desk_id: string) => {
    setChangeDeskID(desk_id);
  };

  if (!isLoading) {
    return sessionData != undefined ? (
      sessionData.isValid() ? (
        deskData.length != 0 ? (
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
            <div>{roomNumber}</div>
            <Room
              roomNumber={roomNumber}
              deskData={deskData}
              changeSitDesk={changeSitDesk}
              changeStandDesk={changeStandDesk}
              changeOldDesk={changeOldDesk}
              openModal={openModal}
              targetDesk={targetDesk}
              authName={sessionData.idToken.payload.name}
            />
          </div>
        ) : (
          <></>
        )
      ) : (
        <>
          <button type="submit" onClick={signIn}>
            {" "}
            認証{" "}
          </button>
        </>
      )
    ) : (
      <>
        <button type="submit" onClick={signIn}>
          {" "}
          認証{" "}
        </button>
      </>
      // signIn()
    );
  }
}
