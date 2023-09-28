import "@/styles/globals.css";
import { Amplify } from "aws-amplify";
import type { AppProps } from "next/app";

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

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
