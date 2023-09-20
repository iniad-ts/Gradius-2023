import { SCREEN_WIDTH } from 'commonConstantsWithClient';
import { useMemo } from 'react';
import { Circle } from 'react-konva';

type Props = {
  x: number;
  y: number;
  displayPosition: number;
};

export const Shield = ({ x, y, displayPosition }: Props) => {
  const relativePos = useMemo(() => {
    return {
      x: x - displayPosition * SCREEN_WIDTH,
      y,
    };
  }, [x, y, displayPosition]);

  return (
    <>
      <Circle
        x={relativePos.x}
        y={relativePos.y}
        radius={75}
        opacity={0.3}
        fill="lightblue"
        stroke="blue"
        strokeWidth={8}
      />
    </>
  );
};

export default Shield;
