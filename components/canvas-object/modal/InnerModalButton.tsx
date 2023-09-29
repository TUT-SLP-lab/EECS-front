import { Rect, Text } from "react-konva";
import { ClickableGroup } from "../ClickableGroup";
type Props = {
  x: number;
  y: number;
  onClick: () => void;
  text: string;
};
export const InnerModalButton = ({ x, y, onClick, text }: Props) => {
  const innerButtonStyle = {
    width: 80,
    height: 40,
  };
  return (
    <ClickableGroup x={x} y={y} onClick={onClick}>
      <Rect
        width={innerButtonStyle.width}
        height={innerButtonStyle.height}
        fill="silver"
        cornerRadius={8}
      />
      <Text
        width={innerButtonStyle.width}
        height={innerButtonStyle.height}
        align="center"
        verticalAlign="middle"
        text={text}
        fontSize={20}
        fill="black"
      />
    </ClickableGroup>
  );
};
