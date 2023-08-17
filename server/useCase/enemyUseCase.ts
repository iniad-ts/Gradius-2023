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
    await enemiesRepository.create(newEnemy);
    return newEnemy;
  },
  findAll: async (displayNumber: number) => {
    const res = (await enemiesRepository.findAll()) ?? [];
    const enemiesInDisplay = res.filter((enemy) =>
      isInDisplay(displayNumber, enemy.createdPosition.x)
    );
    return enemiesInDisplay;
  },
  kill: async (enemyId: string, userId: UserId) => {
    await enemiesRepository.update(enemyId, new Date());
    const userStatus = await playerUseCase.getStatus(userId, null);
    if (userStatus !== null) {
      await playersRepository.save({ ...userStatus, score: userStatus.score + 1 });
    }
  },
};
