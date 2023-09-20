import { useEffect, useState } from 'react';
import { Circle } from 'react-konva';
import type { Pos } from 'src/types/types';
import { hslToRGB } from 'src/utils/hslToRGB';

type MeteorModel = {
  pos: Pos;
  createdAt: number;
  duration: number;
  color: string;
};

export const Star = () => {
  const [star, setStar] = useState<MeteorModel | null>(null);

  const time = Date.now();

  useEffect(() => {
    if (star === null) {
      const x = Math.floor(Math.random() * 1920);
      const y = Math.floor(Math.random() * 540);
      const duration = 3000 + Math.random() * 2000;
      const h = Math.random() * 90;
      const fixedH = h > 70 ? h + 100 : h;
      const color = hslToRGB(fixedH, 1, 0.5);
      setStar({
        pos: { x, y },
        duration,
        createdAt: Date.now(),
        color,
      });
      setTimeout(() => setStar(null), duration);
    }
  }, [star]);

  if (star === null)
    return (
      <Circle
        x={Math.floor(Math.random() * 1920)}
        y={Math.floor(Math.random() * 540)}
        radius={1}
        fill="#fff"
      />
    );

  return (
    <Circle
      x={star.pos.x}
      y={star.pos.y}
      radius={5}
      fill={star.color}
      opacity={
        1 - Math.abs(star.duration - ((time - star.createdAt) % star.duration) * 2) / star.duration
      }
    />
  );
};
