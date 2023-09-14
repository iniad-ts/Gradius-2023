import { DISPLAY_COUNT, SCREEN_HEIGHT, SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { computePosition } from '$/service/computePositions';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

const updateIntervalId: NodeJS.Timeout[] = [];
const createIntervalId: NodeJS.Timeout[] = [];
const ENEMY_UPDATE_INTERVAL = 100;
const ENEMY_CREATE_INTERVAL = 1000;

export const enemyUseCase = {
  init: () => {
    updateIntervalId.push(
      setInterval(() => {
        enemyUseCase.update();
      }, ENEMY_UPDATE_INTERVAL)
    );

    createIntervalId.push(
      setInterval(() => {
        enemyUseCase.create();
      }, ENEMY_CREATE_INTERVAL)
    );
  },

  stop: () => {
    if (updateIntervalId.length > 0) {
      updateIntervalId.forEach(clearInterval);
    }
    if (createIntervalId.length > 0) {
      createIntervalId.forEach(clearInterval);
    }
  },

  create: async (): Promise<EnemyModel | null> => {
    const count = await enemyRepository.count();

    if (count > 12) return null;

    const newEnemy = await enemyRepository.create({
      id: enemyIdParser.parse(randomUUID()),
      direction: {
        x: (Math.random() >= 0.5 ? 1 : -1) * 0.5,
        y: 0,
      },
      createdPos: {
        x: Math.random() * (SCREEN_WIDTH * DISPLAY_COUNT - 1000) + 500,
        y: Math.floor(Math.random() * SCREEN_HEIGHT),
      },
      createdAt: Date.now(),
      type: Math.floor(Math.random() * 3),
    });

    return newEnemy;
  },

  update: async () => {
    const currentEnemyList = await enemyRepository.findAll();

    const outOfDisplay = (pos: { x: number; y: number }) => {
      const terms = [
        pos.x < -100,
        pos.y < 0,
        pos.x > DISPLAY_COUNT * SCREEN_WIDTH + 100,
        pos.y > SCREEN_HEIGHT,
      ];

      return terms.some(Boolean);
    };

    await Promise.all(
      currentEnemyList.map((enemy) => {
        const pos = computePosition(enemy);
        if (outOfDisplay(pos)) {
          return enemyRepository.delete(enemy.id);
        }
      })
    );
  },
  getEnemiesByDisplay: async (displayNumber: number): Promise<EnemyModel[]> => {
    const enemies = await enemyRepository.findAll();
    const enemiesByDisplayNumber = enemies.filter((enemy) => {
      const pos = computePosition(enemy);
      return Math.floor(pos.x / SCREEN_WIDTH) === displayNumber;
    });

    return enemiesByDisplayNumber;
  },
};
