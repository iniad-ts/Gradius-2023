import { SCREEN_HEIGHT } from '$/commonConstantsWithClient';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { gameRepository } from '$/repository/gameRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

let intervalId: NodeJS.Timeout | null = null;
export const enemyUseCase = {
  init: () => {
    intervalId = setInterval(() => {
      enemyUseCase.create();
      enemyUseCase.update();
    }, 100);
  },
  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
  create: async (): Promise<EnemyModel | null> => {
    const count = await enemyRepository.count();
    if (count > 3) return null;
    //TODO: 敵の出現頻度や場所を考える必要がある
    const game = await gameRepository.find();
    const MAX_X = 1920 * (game?.displayNumber ?? 0) - 500;
    const MIN_X = 300;
    const enemyData: EnemyModel = {
      enemyId: enemyIdParser.parse(randomUUID()),
      //Math.random() * ( 最大値 - 最小値 ) + 最小値; 「最小値 〜 最大値」
      pos: { x: Math.random() * (MAX_X - MIN_X), y: Math.floor(Math.random() * SCREEN_HEIGHT) },
      score: 100,
      vector: { x: -2, y: 0 },
      type: 0,
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
        y: currentEnemyInfo.pos.y + currentEnemyInfo.vector.y,
      },
    };
    await enemyRepository.save(updateEnemyInfo);
    return updateEnemyInfo;
  },
  delete: async (enemyModel: EnemyModel) => {
    try {
      await enemyRepository.delete(enemyModel.enemyId);
    } catch (e) {
      console.error(e);
    }
  },
  update: async () => {
    const currentEnemyInfos = await enemyRepository.findAll();
    const game = await gameRepository.find();
    const promises = currentEnemyInfos.map((enemy) => {
      if (enemy.pos.x > 1920 * (game?.displayNumber ?? 0) || enemy.pos.x < 50) {
        return enemyUseCase.delete(enemy);
      } else {
        return enemyUseCase.move(enemy);
      }
    });
    await Promise.all(promises);
  },
};
