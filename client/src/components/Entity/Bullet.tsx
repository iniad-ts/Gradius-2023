import { BULLET_RADIUS, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { BulletModelWithPos } from 'commonTypesWithClient/models';
import { useMemo } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type Props = {
  bullet: BulletModelWithPos;
  displayPosition: number;
  nowTime: number;
};

export const Bullet = ({ bullet, displayPosition, nowTime }: Props) => {
  const [bulletImage1] = useImage(staticPath.images.entity.bullet_blue_png);
  const [bulletImage2] = useImage(staticPath.images.entity.bullet_red_png);

  const images = [bulletImage1, bulletImage2];

  const ownerType = useMemo(() => {
    return bullet.side === 'left' ? 0 : 1;
  }, [bullet.side]);

  const relativePos = useMemo(() => {
    return {
      x: bullet.pos.x - BULLET_RADIUS - displayPosition * SCREEN_WIDTH,
      y: bullet.pos.y - BULLET_RADIUS,
    };
  }, [bullet, displayPosition]);

  const opacity = () =>
    (Math.cos(((Math.max(4, nowTime - (bullet.createdAt + 4000)) - 4) / 100) * Math.PI) + 1) / 2;
  //TODO - この4000という数字が何かよくわからないので要検証
  //おそらく通信のラグだが、4000msもあると思えん

  return (
    <Image
      image={images[ownerType]}
      width={BULLET_RADIUS * 2}
      height={BULLET_RADIUS * 2}
      x={relativePos.x}
      y={relativePos.y}
      opacity={opacity()}
    />
  );
};
