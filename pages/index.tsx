import { MainView } from "@/components/layouts/MainView";
import { SlackAuthenticator } from "@/components/common/SlackAuthenticator";

export default function Home() {
  return (
    <SlackAuthenticator>
      <MainView />
    </SlackAuthenticator>
  );
}
