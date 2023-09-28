import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { useDeskState } from "@/hooks/useDeskState";
import { useSessionState } from "@/hooks/useSessionState";
import { DeskView } from "@/components/layouts/DeskView";

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
  const { deskDatas } = useDeskState();

  if (!isLoading) {
    return sessionData != undefined ? (
      sessionData.isValid() ? (
        deskDatas.length != 0 ? (
          <DeskView sessionData={sessionData} />
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
      // <>
      //   <button type="submit" onClick={signIn}>
      //     {" "}
      //     認証{" "}
      //   </button>
      // </>
      signIn()
    );
  }
}
