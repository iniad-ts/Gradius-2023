import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const enemyUsecase = {
  create: async (): Promise<EnemyModel | null> => {
    const enemyData: EnemyModel = {
      enemyId: enemyIdParser.parse(randomUUID()),
      pos: { x: 50, y: 300 },
      score: 100,
      vector: { x: 5, y: 5 },
      type: 0,
    };
    await enemyRepository.save(enemyData);
    return enemyData;
  },
};
