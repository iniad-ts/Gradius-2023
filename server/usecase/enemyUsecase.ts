import {
  DISPLAY_COUNT,
  ENEMY_HALF_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '$/commonConstantsWithClient';
import type { EnemyModel, EnemyModelWithPos } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { computePosition } from '$/service/computePositions';
import { entityChangeWithPos } from '$/service/entityChangeWithPos';
import { enemyIdParser } from '$/service/idParsers';
import { type2EnemyMove } from '$/service/type2EnemyMove';
import { randomUUID } from 'crypto';

const updateIntervalId: NodeJS.Timeout[] = [];
const createIntervalId: NodeJS.Timeout[] = [];

const ENEMY_UPDATE_INTERVAL = 100;
const ENEMY_CREATE_INTERVAL = 1000;

const TYPE0_ENEMY_LIMIT = 12;
const TYPE1_ENEMY_LIMIT = 6;
const TYPE2_ENEMY_LIMIT = 6;

type Count = [number, number, number];

const createStrongEnemies = async (counts: Count[]) => {
  await Promise.all(
    counts.map(
      (count, displayNum) =>
        //  [
        // Promise.all(
        //   [...Array(TYPE1_ENEMY_LIMIT - count[1])].map(async () => {
        //     return
        enemyRepository
          .create({
            id: enemyIdParser.parse(randomUUID()),
            direction: {
              x: 0,
              y: 0,
            },
            createdPos: {
              x: 1835 + SCREEN_WIDTH * displayNum,
              y: Math.random() >= 0.5 ? 0 : 540,
            },
            createdAt: Date.now(),
            type: 1,
          })
          .catch((error) => console.error(error))
      // }
    )
    // ),
    // Promise.all(
    //   [...Array(TYPE2_ENEMY_LIMIT - count[2])].map(async () => {
    //     return enemyRepository
    //       .create({
    //         id: enemyIdParser.parse(randomUUID()),
    //         direction: {
    //           x: 0,
    //           y: 0,
    //         },
    //         createdPos: {
    //           x: 1835 + SCREEN_WIDTH * displayNum,
    //           y: Math.random() >= 0.5 ? 0 : 540,
    //         },
    //         createdAt: Date.now(),
    //         type: 2,
    //       })
    //       .catch((error) => console.error(error));
    //   })
    // ),
    // ])
    // .flat(1)
  );
};

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
    const enemies = await enemyRepository.findAll();

    const counts: Count[] = [...Array(DISPLAY_COUNT)].map(() => [0, 0, 0]);

    const countsByType = () => {
      enemies.forEach((enemy) => {
        const displayNum = Math.floor(enemy.createdPos.x / SCREEN_WIDTH);
        if (counts[displayNum][enemy.type - 1] === undefined) return;
        counts[displayNum][enemy.type]++;
      });
    };

    countsByType();

    createStrongEnemies(counts);

    if (counts.map((count) => count[0]).reduce((a, b) => a + b) > TYPE0_ENEMY_LIMIT) return null;

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
      type: 0,
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
        if (outOfDisplay(pos) && enemy.type === 0) {
          return enemyRepository.delete(enemy.id);
        }
      })
    );
  },

  getEnemiesByDisplay: async (displayNumber: number): Promise<EnemyModelWithPos[]> => {
    const enemies = await enemyRepository.findAll();
    const getEnemiesByDisplay = enemies
      .map((enemy) => (enemy.type === 0 ? entityChangeWithPos(enemy) : type2EnemyMove(enemy)))
      .filter(
        (enemy) =>
          enemy.pos.x + ENEMY_HALF_WIDTH > SCREEN_WIDTH * displayNumber &&
          enemy.pos.x - ENEMY_HALF_WIDTH < SCREEN_WIDTH * (displayNumber + 1)
      ) as EnemyModelWithPos[];

    return getEnemiesByDisplay;
  },

  getEnemiesAll: async () => {
    const enemies = await enemyRepository.findAll();
    const enemiesWithPos = enemies.map((enemy) =>
      enemy.type === 0 ? entityChangeWithPos(enemy) : type2EnemyMove(enemy)
    );

    return enemiesWithPos as EnemyModelWithPos[];
  },
};
