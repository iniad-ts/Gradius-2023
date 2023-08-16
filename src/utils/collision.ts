import type { BulletModel } from '$/commonTypesWithClient/models';
import { posWithBulletModel } from './posWithBulletModel';
const COLLISION_DISTANCE = 50;

export const collisionBullets = (
  pos: { x: number; y: number },
  bullets: BulletModel[],
  currentTime: number
) => {
  return bullets.filter((bullet) => {
    const bulletPosition = posWithBulletModel(bullet, currentTime);
    const distanceSquared =
      Math.pow(pos.x - bulletPosition[0], 2) + Math.pow(pos.y - bulletPosition[1], 2);
    return distanceSquared < COLLISION_DISTANCE ** 2;
  });
};
