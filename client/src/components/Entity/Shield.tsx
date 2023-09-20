import { BULLET_RADIUS, SCREEN_WIDTH } from 'commonConstantsWithClient';
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
      x: x - BULLET_RADIUS - displayPosition * SCREEN_WIDTH,
      y: y - BULLET_RADIUS,
    };
  }, [x, y, displayPosition]);

  return (
    <>
      <Circle x={relativePos.x + 10} y={relativePos.y} radius={75} opacity={0.3} fill="blue" />
    </>
  );
};

export default Shield;
