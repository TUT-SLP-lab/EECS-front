import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { useDeskState } from "@/hooks/useDeskState";
import { useSessionState } from "@/hooks/useSessionState";
import { DeskView } from "@/components/layouts/DeskView";
import { SlackAuthenticator } from "@/components/common/SlackAuthenticator";
import { AmplifyProvider } from "@aws-amplify/ui-react";

export default function Home() {
  // const { sessionData, isLoading } = useSessionState();
  // const { deskDatas } = useDeskState();

  return (
    <SlackAuthenticator>
      {/* <AmplifyProvider> */}
      <DeskView />
      {/* </AmplifyProvider> */}
    </SlackAuthenticator>
  );

  // if (!isLoading) {
  //   return sessionData != undefined ? (
  //     sessionData.isValid() ? (
  //       deskDatas.length != 0 ? (
  //         <DeskView/>
  //       ) : (
  //         <></>
  //       )
  //     ) : (
  //       <>
  //         <button type="submit" onClick={signIn}>
  //           {" "}
  //           認証{" "}
  //         </button>
  //       </>
  //     )
  //   ) : (
  //     // <>
  //     //   <button type="submit" onClick={signIn}>
  //     //     {" "}
  //     //     認証{" "}
  //     //   </button>
  //     // </>
  //     signIn()
  //   );
  // }
}
