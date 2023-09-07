import { SCREEN_HEIGHT, SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { gameRepository } from '$/repository/gameRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

let intervalId: NodeJS.Timeout | null = null;
const SCREEN_WIDTH = 1920;
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
    const displayNumber = (await gameRepository.find().then((game) => game?.displayNumber)) ?? 1;

    if (count > 12) return null;
    const enemyData: EnemyModel = {
      enemyId: enemyIdParser.parse(randomUUID()),
      //Math.random() * ( 最大値 - 最小値 ) + 最小値; 「最小値 〜 最大値」
      pos: {
        x: Math.random() * (SCREEN_WIDTH * displayNumber - 1000) + 500,
        y: Math.floor(Math.random() * SCREEN_HEIGHT),
      },
      score: 100,
      vector: {
        x: 2 * (Math.random() > 0.5 ? 1 : -1),
        y: 0,
      },
      type: Math.floor(Math.random() * 3),
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
    const currentEnemyList = await enemyRepository.findAll();
    const displayNumber = (await gameRepository.find().then((game) => game?.displayNumber)) ?? 1;

    const outOfDisplay = (pos: { x: number; y: number }) => {
      const terms = [
        pos.x < -100,
        pos.y < 0,
        pos.x > displayNumber * SCREEN_WIDTH + 100,
        pos.y > SCREEN_HEIGHT,
      ];

      return terms.some(Boolean);
    };

    await Promise.all(
      currentEnemyList.map((enemy) => {
        if (outOfDisplay(enemy.pos)) {
          return enemyUseCase.delete(enemy);
        } else {
          return enemyUseCase.move(enemy);
        }
      })
    );
  },
};
