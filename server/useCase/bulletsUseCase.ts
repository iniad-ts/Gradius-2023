import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import { playerUseCase } from './playerUseCase';

export type MoveTo = {
  toX: number;
  toY: number;
};

export const bulletUseCase = {
  create: async (id: UserId): Promise<BulletModel | null> => {
    const currentUserStatus = await playerUseCase.getStatus(id, null);
    const newUserStatus = JSON.parse(JSON.stringify(currentUserStatus));
    if (newUserStatus !== null) {
      const newBullet: BulletModel = {
        id: bulletIdParser.parse(randomUUID()),
        createdPosition: {
          ...newUserStatus?.position,
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
