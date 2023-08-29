import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

let intervalId: NodeJS.Timeout | null = null;
export const enemyUsecase = {
  init: () => {
    intervalId = setInterval(() => {
      enemyUsecase.create();
      enemyUsecase.update();
    }, 500);
  },
  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
  create: async (): Promise<EnemyModel | null | undefined> => {
    const count = await enemyRepository.count();
    if (count > 3) return;
    const enemyData: EnemyModel = {
      enemyId: enemyIdParser.parse(randomUUID()),

      pos: { x: 1000, y: Math.floor(Math.random() * 800) },
      score: 100,
      vector: { x: -25, y: -5 },
      type: Math.floor(Math.random() * 3) + 1,
    };
    await enemyRepository.save(enemyData);
    return enemyData;
  },
  findAll: async (): Promise<EnemyModel[]> => {
    const enemies = await enemyRepository.findAll();
    return enemies.length > 0 ? enemies : [];
  },
  move: async (enemyModel: EnemyModel): Promise<EnemyModel | null> => {
    const currentEnemyInfo = await enemyRepository.find(enemyModel.enemyId);
    if (currentEnemyInfo === null) return null;
    const updateEnemyInfo: EnemyModel = {
      ...currentEnemyInfo,
      pos: {
        x: currentEnemyInfo.pos.x + currentEnemyInfo.vector.x,
        y: currentEnemyInfo.pos.y,
      },
    };
    await enemyRepository.save(updateEnemyInfo);
    return updateEnemyInfo;
  },
  delete: async (enemyModel: EnemyModel): Promise<EnemyModel | null> => {
    const currentEnemyInfo = await enemyRepository.find(enemyModel.enemyId);
    if (currentEnemyInfo === null) return null;
    await enemyRepository.delete(enemyModel.enemyId);
    return currentEnemyInfo;
  },
  update: async () => {
    const currentEnemyInfos = await enemyRepository.findAll();
    const promises = currentEnemyInfos.map((enemy) => {
      if (enemy.pos.x > 1920 || enemy.pos.x < 50) {
        return enemyUsecase.delete(enemy);
      } else {
        return enemyUsecase.move(enemy);
      }
    });
    await Promise.all(promises);
  },
};
