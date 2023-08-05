import React from 'react';
import { Circle } from 'react-konva';

type BulletProps = {
  bullet: {
    createdAt: number;
    direction: number;
    createdPosition: {
      x: number;
      y: number;
    };
  };
  currentTime: number;
};

const BULLET_SPEED = 300;

export const Bullet: React.FC<BulletProps> = ({ bullet, currentTime }) => {
  const elapsedTime = (currentTime - bullet.createdAt) / 1000;

  const dx = BULLET_SPEED * elapsedTime * Math.cos(bullet.direction);
  const dy = BULLET_SPEED * elapsedTime * Math.sin(bullet.direction);
  const x = bullet.createdPosition.x + dx;
  const y = bullet.createdPosition.y + dy;

  return <Circle x={x} y={y} radius={5} fill="red" />;
};
