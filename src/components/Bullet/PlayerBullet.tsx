import React from 'react';
import { Circle } from 'react-konva';
import { posWithDirSpeTim } from 'src/utils/posWithDirSpeTim';

type BulletProps = {
  bullet: {
    createdAt: number;
    direction: {
      x: number;
      y: number;
    };
    createdPosition: {
      x: number;
      y: number;
    };
  };
  currentTime: number;
};

export const Bullet: React.FC<BulletProps> = ({ bullet, currentTime }) => {
  const [x, y] = posWithDirSpeTim(bullet, currentTime);

  return <Circle x={x} y={y} radius={5} fill="red" />;
};
