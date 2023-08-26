import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyRepository } from '$/repository/enemyRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const enemyUsecase = {
  create: async (): Promise<EnemyModel | null> => {
    const enemyData: EnemyModel = {
      enemyId: enemyIdParser.parse(randomUUID()),
      pos: {
        x: Math.floor(Math.random() * 1920),
        y: Math.floor(Math.random() * 1080),
      },
      score: 100,
      vector: { x: -5, y: -5 },
      type: Math.floor(Math.random() * 3) + 1,
    };
    await enemyRepository.save(enemyData);
    return enemyData;
  },
  move: async () => {
    const currentEnemyInfos = await enemyUsecase.findAll();
    const updatedEnemies = currentEnemyInfos.map((enemy) => ({
      ...enemy,
      pos: {
        x: enemy.pos.x + enemy.vector.x,
        y: enemy.pos.y + enemy.vector.y,
      },
    }));
    await Promise.all(updatedEnemies.map((enemy) => enemyRepository.save(enemy)));
  },
  moveDirection: async () => {
    const setVectorByType = (enemy: EnemyModel): void => {
      const enemyTypeHandler = [
        () => ({ x: -10, y: 15 }),
        () => ({ x: -15, y: -7 }),
        () => ({ x: 9, y: -13 }),
      ];

      enemy.vector = enemyTypeHandler[enemy.type - 1]();
    };
    const enemies = await enemyRepository.findAll();
    for (const enemy of enemies) {
      setVectorByType(enemy);
      await enemyRepository.save(enemy);
    }
  },
  findAll: async (): Promise<EnemyModel[]> => {
    const enemies = await enemyRepository.findAll();
    return enemies.length > 0 ? enemies : [];
  },
};

// setInterval(() => {
//   enemyUsecase.create();
// }, 100000);

// setInterval(() => {
//   enemyUsecase.move();
// }, 1000);

// setInterval(() => {
//   enemyUsecase.moveDirection();
// }, 100);
