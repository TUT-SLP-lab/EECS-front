import { SlackLogo } from "./SlackLogo";

export const SlackSignInButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      <SlackLogo />
      <span>Sign in with Slack</span>
    </button>
  );
};
