import type { BulletModel } from '$/commonTypesWithClient/models';

const BULLET_SPEED = 300;

export const posWithBulletModel = (bullet: BulletModel) => {
  const elapsedTime = (new Date().getTime() - bullet.createdAt) / 1000;
  const dx = BULLET_SPEED * elapsedTime * bullet.direction.x;
  const dy = BULLET_SPEED * elapsedTime * bullet.direction.y;
  const x = bullet.createdPosition.x + dx;
  const y = bullet.createdPosition.y + dy;
  return [x, y];
};
