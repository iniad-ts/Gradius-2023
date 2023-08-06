import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { bulletIdParser } from '$/service/idParsers';
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
};
