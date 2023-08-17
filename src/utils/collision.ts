import type { BulletModel } from '$/commonTypesWithClient/models';
import { posWithDirSpeTim } from './posWithDirSpeTim';
const COLLISION_DISTANCE = 50;

export const collisionBullets = (
  pos: { x: number; y: number },
  bullets: BulletModel[],
  currentTime: number
) => {
  return bullets.filter((bullet) => {
    const bulletPosition = posWithDirSpeTim(bullet, currentTime);
    const distanceSquared =
      Math.pow(pos.x - bulletPosition[0], 2) + Math.pow(pos.y - bulletPosition[1], 2);
    return distanceSquared < COLLISION_DISTANCE ** 2;
  });
};
