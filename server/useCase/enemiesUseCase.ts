import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import { playerUseCase } from './playerUseCase';

export const enemyUseCase = {
  create: async (): Promise<EnemyModel | null> => {
    const newEnemy: EnemyModel = {
      id: enemyIdParser.parse(randomUUID()),
      createdPosition: {
        x: Math.floor(Math.random() * 1920),
        y: Math.floor(Math.random() * 1080),
      },
      createdAt: Date.now(),
      type: 0,
    };
    console.log('create');
    await enemiesRepository.create(newEnemy);
    return newEnemy;
  },
  delete: async (enemyId: string, userId: UserId) => {
    await enemiesRepository.delete(enemyId);
    const userStatus = await playerUseCase.getStatus(userId, null);
    if (userStatus !== null) {
      await playersRepository.save({ ...userStatus, score: userStatus.score + 1 });
    }
  },
};
