import React, { useEffect, useState } from 'react';
import { Circle, Line } from 'react-konva';
import type { Pos } from 'src/types/types';

type MeteorModel = {
  pos: Pos;
  length: number;
  createdAt: number;
};

export const FreedomMeteor = () => {
  const [meteor, setMeteor] = useState<MeteorModel | null>(null);

  const time = Date.now();

  useEffect(() => {
    if (meteor === null) {
      const x = Math.floor(Math.random() * 1920);
      const y = Math.floor(Math.random() * Math.min(540, ((1920 - x) / 16) * 9));
      setMeteor({
        pos: { x, y },
        length: Math.floor(Math.random() * y),
        createdAt: Date.now(),
      });
      setTimeout(() => setMeteor(null), 1000);
    }
  }, [setMeteor, meteor]);

  if (meteor === null) return false;

  const length = meteor.length;
  const h = (length / 16) * 9;
  const a1 = meteor.pos.x + length - length * ((time - meteor.createdAt) / 1000);
  const b1 = meteor.pos.y - h + h * ((time - meteor.createdAt) / 1000);
  const a2 = meteor.pos.x;
  const b2 = meteor.pos.y;
  const free = [a1, b1, a2, b2];
  return (
    <React.Fragment>
      <Line points={free} stroke="#fff" strokeWidth={2} />
      <Circle x={a2} y={b2} radius={6 - Math.abs((600 - (time % 1000)) / 100)} fill="#fff" />
    </React.Fragment>
  );
};
