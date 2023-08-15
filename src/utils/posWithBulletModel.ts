const BULLET_SPEED = 300;

export const posWithBulletModel = (
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
  },
  currentTime: number
) => {
  const elapsedTime = (currentTime - bullet.createdAt) / 1000;

  const dx = BULLET_SPEED * elapsedTime * bullet.direction.x;
  const dy = BULLET_SPEED * elapsedTime * bullet.direction.y;
  const x = bullet.createdPosition.x + dx;
  const y = bullet.createdPosition.y + dy;
  return [x, y];
};
