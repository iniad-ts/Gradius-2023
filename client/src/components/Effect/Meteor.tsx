import { DISPLAY_COUNT } from 'commonConstantsWithClient';
import React, { useEffect, useState } from 'react';
import { Circle, Line } from 'react-konva';
import type { Pos } from 'src/types/types';

type MeteorModel = {
  pos: Pos;
  length: number;
  createdAt: number;
};

export const Meteor = ({ displayPosition }: { displayPosition: number }) => {
  const [meteor, setMeteor] = useState<MeteorModel | null>(null);

  const time = Date.now();

  const isView1 = Math.floor(time / 1000) % (DISPLAY_COUNT + 1) === displayPosition;
  const isView2 = Math.floor(time / 1000) % (DISPLAY_COUNT + 1) === displayPosition + 1;

  const x1 = 480 - 480 * Math.min(1, (time % 1000) / 500);
  const y1 = 0 + 270 * Math.min(1, (time % 1000) / 500);
  const x2 = 0;
  const y2 = 270;
  const one = [x1, y1, x2, y2];

  const x3 = 1920 - 480 * (((time % 1000) - 500) / 500);
  const y3 = 270 + 270 * (((time % 1000) - 500) / 500);
  const x4 = 1440;
  const y4 = 540;
  const two = [x3, y3, x4, y4];

  useEffect(() => {
    if (meteor === null) {
      const x = Math.floor(Math.random() * 1920);
      const y = Math.floor(Math.random() * ((1920 - x) / 16) * 9);
      setMeteor({ pos: { x, y }, length: Math.floor(Math.random() * y), createdAt: time });
      setTimeout(() => setMeteor(null), 1000);
    }
  }, [setMeteor, meteor, time]);
  return (
    <React.Fragment>
      {isView1 && <Line points={one} stroke="#fff" strokeWidth={3} />}
      {isView2 && (
        <React.Fragment>
          <Line points={two} stroke="#fff" strokeWidth={4} />
          <Circle x={x4} y={y4} radius={6 - Math.abs((600 - (time % 1000)) / 100)} fill="#fff" />
        </React.Fragment>
      )}
      <FreedomMeteor meteor={meteor} time={time} />
    </React.Fragment>
  );
};

const FreedomMeteor = ({ meteor, time }: { meteor: MeteorModel | null; time: number }) => {
  console.log(meteor);
  if (meteor === null) return;
  const h = (length / 16) * 9;
  const a1 = meteor.pos.x + length;
  // - length * ((time - meteor.createdAt) / 1000);
  const b1 = meteor.pos.y - h;
  // +- h * ((time - meteor.createdAt) / 1000);
  const a2 = meteor.pos.x;
  const b2 = meteor.pos.y;
  const free = [a1, b1, a2, b2];
  return <Line points={free} stroke="#fff" strokeWidth={2} />;
};
