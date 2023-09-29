import { on } from "events";
import { KonvaEventObject } from "konva/lib/Node";
import { Group } from "react-konva";

type Props = {
  x: number;
  y: number;
  onClick: (e: any) => void;
  children: React.ReactNode;
};

export const ClickableGroup = ({ x, y, onClick, children }: Props) => {
  const onMouseEnterHandler = (e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    if (container) {
      container.style.cursor = "pointer";
    }
  };
  const onMouseLeaveHandler = (e: KonvaEventObject<MouseEvent>) => {
    const container = e.target.getStage()?.container();
    if (container) {
      container.style.cursor = "default";
    }
  };

  return (
    <Group
      x={x}
      y={y}
      onClick={onClick}
      onTap={onClick}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
    </Group>
  );
};
