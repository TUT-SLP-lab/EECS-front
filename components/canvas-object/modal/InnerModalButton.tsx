import { Rect, Text } from "react-konva";
import { ClickableGroup } from "../ClickableGroup";
type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: () => void;
  text: string;
};
export const InnerModalButton = ({
  x,
  y,
  width,
  height,
  onClick,
  text,
}: Props) => {
  return (
    <ClickableGroup x={x} y={y} onClick={onClick}>
      <Rect width={width} height={height} fill="silver" cornerRadius={8} />
      <Text
        width={width}
        height={height}
        align="center"
        verticalAlign="middle"
        text={text}
        fontSize={20}
        fill="black"
      />
    </ClickableGroup>
  );
};
