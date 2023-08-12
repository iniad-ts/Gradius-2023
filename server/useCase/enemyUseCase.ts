import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyTable } from '$/constants/enemyTable';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { enemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import { playerUseCase } from './playerUseCase';

const RESPAWN_TIME = 5000;

export const enemyUseCase = {
  create: async () => {
    //専らデバッグ用
    const newEnemy: EnemyModel = {
      id: enemyIdParser.parse(randomUUID()),
      createdPosition: {
        x: Math.floor(Math.random() * 1920),
        y: Math.floor(Math.random() * 1080),
      },
      createdAt: Date.now(),
      deletedAt: null,
      type: 0,
    };
    await enemiesRepository.create(newEnemy);
  },
  kill: async (enemyId: string, userId: UserId) => {
    await enemiesRepository.update(enemyId, new Date());
    console.log('killed');
    const userStatus = await playerUseCase.getStatus(userId, null);
    if (userStatus !== null) {
      await playersRepository.save({ ...userStatus, score: userStatus.score + 1 });
    }
  },
  respawn: async () => {
    const nowTime = new Date().getTime();
    const resS = await enemiesRepository.findNotNull();
    resS
      .filter((res) => nowTime - res.deletedAt.getTime() > RESPAWN_TIME)
      .forEach(async (res) => {
        await enemiesRepository.update(res.id, null);
      });
  },
  createAll: async () => {
    const res = await enemyTable();
    if (res === null) {
      enemyUseCase.createAll();
    } else {
      res.forEach((tables, displayNumberMinus1) =>
        tables.forEach((table) => {
          const newEnemy: EnemyModel = {
            id: enemyIdParser.parse(randomUUID()),
            createdPosition: {
              x: table.createPosition.x + 1920 * displayNumberMinus1,
              y: table.createPosition.y,
            },
            createdAt: Date.now(),
            deletedAt: null,
            type: table.type,
          };
          enemiesRepository.create(newEnemy);
        })
      );
    }
  },
};
