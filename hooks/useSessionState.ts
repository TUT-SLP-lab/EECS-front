import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { cookies } from 'next/headers'
import { CognitoUserSession } from "amazon-cognito-identity-js";

export const useSessionState = () => {
  const [sessionData, setSessionData] = useState<CognitoUserSession>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userInfo = await Auth.currentUserInfo();
      if (userInfo) {
        const session = await Auth.currentSession();
        setSessionData(session);
      } else {
        setSessionData(undefined);
      }
      setIsLoading(false);
    })();
  }, []);

  return { sessionData, isLoading };
};
