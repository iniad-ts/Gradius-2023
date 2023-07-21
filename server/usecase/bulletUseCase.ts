import { randomUUID } from 'crypto';
import { playerUseCase, type Pos } from './playerUseCase';

export type Bullet = {
  id: string;
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
      id: randomUUID(),
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
