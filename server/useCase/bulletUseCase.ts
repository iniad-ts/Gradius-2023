import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import { playerUseCase } from './playerUseCase';

export const bulletUseCase = {
  create: async (id: UserId): Promise<BulletModel | null> => {
    const userStatus = await playerUseCase.getStatus(id, null);
    if (userStatus !== null) {
      const newBullet: BulletModel = {
        id: bulletIdParser.parse(randomUUID()),
        createdPosition: {
          ...userStatus.position,
        },
        direction: 0,
        type: 0,
        playerId: id,
        createdAt: Date.now(),
      };
      await bulletsRepository.create(newBullet);
      console.log('create');
      return newBullet;
    }
    return null;
  },
};
