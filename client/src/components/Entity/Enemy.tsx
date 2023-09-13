import { ENEMY_HALF_WIDTH, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { EnemyModel } from 'commonTypesWithClient/models';
import { useMemo } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { computePosition } from 'src/utils/computePosition';
import useImage from 'use-image';

type Props = {
  displayPosition: number;
  enemy: EnemyModel;
  timeDiffFix: number;
};

export const Enemy = ({ displayPosition, enemy, timeDiffFix }: Props) => {
  const [enemyImage1] = useImage(staticPath.images.entity.ufo_1_png);
  const [enemyImage2] = useImage(staticPath.images.entity.ufo_2_png);
  const [enemyImage3] = useImage(staticPath.images.entity.ufo_3_png);

  const images = [enemyImage1, enemyImage2, enemyImage3];

  const pos = computePosition(enemy.createdPos, enemy.createdAt, enemy.direction, timeDiffFix);

  const relativePos = useMemo(() => {
    return {
      x: pos.x - ENEMY_HALF_WIDTH - displayPosition * SCREEN_WIDTH,
      y: pos.y - ENEMY_HALF_WIDTH,
    };
  }, [displayPosition, pos]);

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
