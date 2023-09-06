import { BULLET_RADIUS, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { BulletModel } from 'commonTypesWithClient/models';
import { useMemo } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type Props = {
  displayPosition: number;
  bullet: BulletModel;
};

export const Bullet = ({ displayPosition, bullet }: Props) => {
  const [bulletImage1] = useImage(staticPath.images.entity.bullet_red_png);
  const [bulletImage2] = useImage(staticPath.images.entity.bullet_blue_png);

  const images = [bulletImage1, bulletImage2];

  const ownerType = useMemo(() => {
    return bullet.side === 'left' ? 0 : 1;
  }, [bullet.side]);

  const relativePos = useMemo(() => {
    return {
      x: bullet.pos.x - BULLET_RADIUS - displayPosition * SCREEN_WIDTH,
      y: bullet.pos.y - BULLET_RADIUS,
    };
  }, [bullet.pos, displayPosition]);

  return (
    <Image
      image={images[ownerType]}
      width={BULLET_RADIUS * 2}
      height={BULLET_RADIUS * 2}
      x={relativePos.x}
      y={relativePos.y}
    />
  );
};
