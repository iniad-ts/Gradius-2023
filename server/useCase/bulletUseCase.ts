import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { gamesRepository } from '$/repository/gamesRepository';
import { bulletIdParser } from '$/service/idParsers';
import { posWithDirSpeTim as posWithBulletModel } from '$/service/posWithDirSpeTim';
import { randomUUID } from 'crypto';
import { playerUseCase } from './playerUseCase';

export const bulletUseCase = {
  create: async (playerId: UserId): Promise<BulletModel | null> => {
    console.log('bulletUseCase.create');
    const player = await playerUseCase.getStatus(playerId, null);
    if (player !== null) {
      const newBullet: BulletModel = {
        id: bulletIdParser.parse(randomUUID()),
        createdPosition: {
          ...player.position,
        },
        direction: 0,
        type: 0,
        playerId,
        createdAt: Date.now(),
      };
      await bulletsRepository.create(newBullet);
      return newBullet;
    }
    return null;
  },
  delete: async () => {
    const bullets = await bulletsRepository.findAll();
    const game = await gamesRepository.find();
    const maxXPosition = ((game?.displayNumber ?? -1) + 1) * 1920;
    const deleteBullets = bullets.filter((bullet) => {
      const [x, y] = posWithBulletModel(bullet);
      return x < 0 || maxXPosition < x || y < 0 || 1080 < y;
    });
    deleteBullets.forEach((bullet) => {
      bulletsRepository.delete(bullet.id);
    });
  },
  getStatus: async () => {
    bulletUseCase.delete();
    enemyUseCase.respawn();
    const res = (await bulletsRepository.findAll()) ?? [];
    const bulletsInDisplay = res
      .filter((bullet) => isInDisplay(displayNumber, posWithBulletModel(bullet)[0]))
      .map((bullet) => ({
        ...bullet,
        createdPosition: {
          ...bullet.createdPosition,
          x: bullet.createdPosition.x - 1920 * displayNumber,
        },
      }));
    return bulletsInDisplay;
  },
};
