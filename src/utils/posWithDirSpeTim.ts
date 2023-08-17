const BULLET_SPEED = 300;

const angleToRadian = (angle: number) => {
  return (angle * Math.PI) / 180;
};
export const posWithDirSpeTim = (
  bullet: {
    createdAt: number;
    direction: number;
    createdPosition: {
      x: number;
      y: number;
    };
  },
  currentTime: number
) => {
  const elapsedTime = (currentTime - bullet.createdAt) / 1000;

  const dx = BULLET_SPEED * elapsedTime * Math.cos(angleToRadian(bullet.direction));
  const dy = BULLET_SPEED * elapsedTime * Math.sin(angleToRadian(bullet.direction));
  const x = bullet.createdPosition.x + dx;
  const y = bullet.createdPosition.y + dy;
  return [x, y];
};
