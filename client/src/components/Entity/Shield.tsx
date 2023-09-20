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
      x: x - 75 - displayPosition * SCREEN_WIDTH,
      y: y - 75,
    };
  }, [x, y, displayPosition]);

  return (
    <>
      <Circle x={relativePos.x + 10} y={relativePos.y} radius={75} opacity={0.3} fill="blue" />
    </>
  );
};

export default Shield;
