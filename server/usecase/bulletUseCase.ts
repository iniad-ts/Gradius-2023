import { playerUseCase, type Pos } from './playerUseCase';

export type Bullet = {
  position: Pos;
  radius: number;
};

const bullets: Bullet[] = [];

const cancelId = setInterval(() => {
  bullets.forEach((bullet) => {
    bullet.position.x += 10;
  });
}, 10);

export const bulletUseCase = {
  getBullets: bullets,
  addBullet: (bul: { radius: number }): Bullet => {
    const bullet: Bullet = {
      position: {
        x: playerUseCase.getPosition.x,
        y: playerUseCase.getPosition.y,
      },
      radius: bul.radius,
    };
    bullets.push(bullet);
    return bullet;
  },
};
