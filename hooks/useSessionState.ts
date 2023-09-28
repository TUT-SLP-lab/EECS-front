import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { cookies } from 'next/headers'

export const useSessionState = () => {
  const [sessionData, setSessionData] = useState<any>(undefined);
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
