import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { SlackSignInButton } from "../Slack/SignInButton";

export function SlackAuthenticator(props: any) {
  const [authState, setAuthState] = useState<string>();

  const signIn = async () => {
    try {
      const user = await Auth.federatedSignIn({
        customProvider: process.env.NEXT_PUBLIC_CUSTOMPROVIDER ?? "",
      })
        .then((credentials) => {
          return credentials;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const listner = Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        setAuthState("signedIn");
        console.log("use Effect signedIn");
      }
      if (payload.event === "signOut") {
        console.log("use Effect signIn");
      }
    });
    Auth.currentAuthenticatedUser()
      .then(() => {
        setAuthState("signedIn");
      })
      .catch((e) => {
        setAuthState("signIn");
        console.log(e);
      });
    return () => listner();
  }, []);

  if (authState === "signedIn") {
    return <>{props.children}</>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SlackSignInButton onClick={signIn} />
    </div>
  );
}
