import type { BulletId, UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel, PlayerModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { playersRepository } from '$/repository/playersRepository';
import { randomUUID } from 'crypto';

let bullets: BulletModel[];

(async () => {
  bullets = (await bulletsRepository.getAll()) ?? [];
})();

export type Pos = {
  x: number;
  y: number;
};

export type BulletModelWithPosition = BulletModel & {
  position: Pos;
};

const getPosition = (bullet: BulletModel): Pos => {
  const diffTime = Date.now() - bullet.createdAt;
  const posX = bullet.createdPosition.x + bullet.speed * Math.cos(bullet.direction) * diffTime;
  const posY = bullet.createdPosition.y + bullet.speed * Math.sin(bullet.direction) * diffTime;

  return {
    x: posX,
    y: posY,
  };
};

const givePosition = (bullet: BulletModel): BulletModelWithPosition => {
  return {
    ...bullet,
    position: getPosition(bullet),
  };
};

// const playerBullets = () => {
//   return bullets.filter((bullet) => bullet.playerId !== null);
// };

// const enemyBullets = () => {
//   return bullets.filter((bullet) => bullet.playerId === null);
// };

// const collision = (targetPos1: Pos, targetPos2: Pos, touchDistanse: number): boolean => {
//   const distance = Math.sqrt(
//     (targetPos1.x - targetPos2.x) ** 2 + (targetPos1.y - targetPos2.y) ** 2
//   );
//   return distance < touchDistanse;
// };

// const collisionPlayer = async (player: PlayerModel) => {
//   //
// };

// const collisionBullet = async (bullet: BulletModel) => {
//   //
// };

// const cancelInterval = setInterval(() => {
//   //
// }, 10);

export const bulletUseCase = {
  getAll: (): BulletModelWithPosition[] => {
    return bullets.map(givePosition);
  },
  shoot: async (userId: UserId): Promise<BulletModelWithPosition | null> => {
    const player: PlayerModel | null = await playersRepository.getUnique(userId);
    if (player === null) return null;
    const newBullet: BulletModel = {
      id: randomUUID() as BulletId,
      createdAt: Date.now(),
      updateAt: Date.now(),
      direction: 0,
      createdPosition: {
        x: player.position.x,
        y: player.position.y,
      },
      speed: 10,
      radius: 3,
      exists: true,
      gameId: player.gameId,
      playerId: player.id,
    };
    bullets.push(newBullet);
    await bulletsRepository.save(newBullet);
    return givePosition(newBullet);
  },
};
