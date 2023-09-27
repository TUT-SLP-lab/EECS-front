import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import ModalButton from "@/components/modalbutton";
import Room from "@/components/room";
import { useDeskState } from "@/hooks/useDeskState";

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
});

async function signIn() {
  try {
    const user = await Auth.federatedSignIn({ customProvider: process.env.NEXT_PUBLIC_CUSTOMPROVIDER ?? "" });
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}

async function getAuthToken() {
  try {
    const session = await Auth.currentSession();
    const authToken = session.getIdToken().getJwtToken();
    return authToken;
  } catch (error) {
    console.error(error);
  }
}

async function fetchProtectedData(session:any) {
  try {
    const authToken = session.getAccessToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APIURL}/prod/desk`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  const [sessionData, setSessionData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [roomNumber, setRoomNumber] = useState("F-301");
  const {
    deskData,
    setDeskData,
    changeSitDesk,
    changeStandDesk,
    changeOldDesk,
  } = useDeskState();

  const handleClick = (e: any) => {
    setRoomNumber(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const userInfo = await Auth.currentUserInfo();
      if(userInfo){
        const session = await Auth.currentSession();
        setSessionData(session);
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (sessionData != undefined) {
      if (sessionData.isValid()) {
        (async () => {
          await fetchProtectedData(sessionData);
        })();
      }
    }
  }, [sessionData]);

  if (!isLoading) {
    return sessionData.isValid() ? (
      <div>
        <div>机を配置する</div>
        <ModalButton>モーダルを開く</ModalButton>
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
        <Room
          roomNumber={roomNumber}
          deskData={deskData}
          changeSitDesk={changeSitDesk}
          changeStandDesk={changeStandDesk}
          changeOldDesk={changeOldDesk}
        />
      </div>
    ) : (
      signIn()
    );
  }
}
