import { Rect, Text } from "react-konva";

interface Props {
  x: number;
  y: number;
  height: number;
  width: number;
  name: string | undefined;
}

export default function Table({ x, y, height, width, name }: Props) {
  return (
    <>
      <Rect x={x} y={y} height={height} width={width} fill="yellow" />
      {name != undefined ? (
        <Text
          text={name}
          x={x + width / 2}
          y={y + height / 2}
          rotation={-90}
        ></Text>
      ) : (
        <></>
      )}
    </>
  );
}
