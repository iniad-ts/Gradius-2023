import React from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { posWithBulletModel } from 'src/utils/posWithBulletModel';
import useImage from 'use-image';

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
  type: 0 | 1 | 2;
  currentTime: number;
};

export const Bullet: React.FC<BulletProps> = ({ bullet, type, currentTime }) => {
  const [bulletRed] = useImage(staticPath.images.bullet_red_png);
  const [bulletBlue] = useImage(staticPath.images.bullet_blue_png);
  const [bulletBlack] = useImage(staticPath.images.bullet_black_png);

  const [x, y] = posWithBulletModel(bullet, currentTime);

  const image = [bulletBlue, bulletRed, bulletBlue][type];

  return <Image image={image} width={15} height={15} x={x} y={y} />;
};
