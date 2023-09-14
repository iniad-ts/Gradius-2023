import { ENEMY_HALF_WIDTH, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { EnemyModelWithPos } from 'commonTypesWithClient/models';
import { useMemo } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type Props = {
  enemy: EnemyModelWithPos;
  displayPosition: number;
};

export const Enemy = ({ displayPosition, enemy }: Props) => {
  const [enemyImage1] = useImage(staticPath.images.entity.ufo_1_png);
  const [enemyImage2] = useImage(staticPath.images.entity.ufo_2_png);
  const [enemyImage3] = useImage(staticPath.images.entity.ufo_3_png);

  const images = [enemyImage1, enemyImage2, enemyImage3];

  const relativePos = useMemo(() => {
    return {
      x: enemy.pos.x - ENEMY_HALF_WIDTH - displayPosition * SCREEN_WIDTH,
      y: enemy.pos.y - ENEMY_HALF_WIDTH,
    };
  }, [displayPosition, enemy]);

  return (
    <Image
      image={images[enemy.type]}
      width={ENEMY_HALF_WIDTH * 2}
      height={ENEMY_HALF_WIDTH * 2}
      x={relativePos.x}
      y={relativePos.y}
    />
  );
};
