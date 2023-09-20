import { DISPLAY_COUNT } from 'commonConstantsWithClient';
import React from 'react';
import { Circle, Line } from 'react-konva';

type props = {
  displayPosition: number;
  nowTime: number;
};

export const Meteor = ({ displayPosition, nowTime }: props) => {
  const isView1 = Math.floor(nowTime / 1000) % (DISPLAY_COUNT + 1) === displayPosition;
  const isView2 = Math.floor(nowTime / 1000) % (DISPLAY_COUNT + 1) === displayPosition + 1;

  const x1 = 480 - 480 * Math.min(1, (nowTime % 1000) / 500);
  const y1 = 0 + 270 * Math.min(1, (nowTime % 1000) / 500);
  const x2 = 0;
  const y2 = 270;
  const one = [x1, y1, x2, y2];

  const x3 = 1920 - 480 * (((nowTime % 1000) - 500) / 500);
  const y3 = 270 + 270 * (((nowTime % 1000) - 500) / 500);
  const x4 = 1440;
  const y4 = 540;
  const two = [x3, y3, x4, y4];

  return (
    <React.Fragment>
      {isView1 && <Line points={one} stroke="#fff" strokeWidth={3} />}
      {isView2 && (
        <React.Fragment>
          <Line points={two} stroke="#fff" strokeWidth={4} />
          <Circle x={x4} y={y4} radius={6 - Math.abs((600 - (nowTime % 1000)) / 100)} fill="#fff" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
