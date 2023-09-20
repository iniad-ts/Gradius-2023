import { useEffect, useState } from 'react';
import { Circle } from 'react-konva';
import type { Pos } from 'src/types/types';

type MeteorModel = {
  pos: Pos;
  createdAt: number;
  duration: number;
};

type prop = { nowTime: number };

export const Star = ({ nowTime }: prop) => {
  const [star, setStar] = useState<MeteorModel | null>(null);

  useEffect(() => {
    if (star === null) {
      const x = Math.floor(Math.random() * 1920);
      const y = Math.floor(Math.random() * 540);
      const duration = Math.random() * 2000;
      setStar({
        pos: { x, y },
        duration,
        createdAt: Date.now(),
      });
      setTimeout(() => setStar(null), duration);
    }
  }, [star]);

  if (star === null) return false;

  return (
    <Circle
      x={star.pos.x}
      y={star.pos.y}
      radius={6 - Math.abs((600 - (nowTime % star.duration)) / 100)}
      fill="#fff"
    />
  );
};
