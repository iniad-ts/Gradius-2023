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
    const currentEnemyInfos = await enemyRepository.findAll();
    for (const currentEnemyInfo of currentEnemyInfos) {
      if (currentEnemyInfo === null) continue;
      const updateEnemyInfo: EnemyModel = {
        ...currentEnemyInfo,
        pos: {
          x: currentEnemyInfo.pos.x + currentEnemyInfo.vector.x,
          y: currentEnemyInfo.pos.y + currentEnemyInfo.vector.y,
        },
      };
      await enemyRepository.save(updateEnemyInfo);
    }
  },
  moveDirection: async () => {
    const enemies = await enemyRepository.findAll();
    for (const enemy of enemies) {
      const enemyTypeHandler = [
        () => (enemy.vector = { x: -10, y: 15 }),
        () => (enemy.vector = { x: -15, y: -7 }),
        () => (enemy.vector = { x: 9, y: -13 }),
      ];
      enemyTypeHandler[enemy.type - 1](), await enemyRepository.save(enemy);
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
//   enemyUsecase.moveDirection();
// }, 1000);
