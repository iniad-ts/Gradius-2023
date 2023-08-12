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
    //現状は専らデバッグ用
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
    const userStatus = await playerUseCase.getStatus(userId, null);
    if (userStatus !== null) {
      await playersRepository.save({ ...userStatus, score: userStatus.score + 1 });
    }
  },
  respawn: async () => {
    const nowTime = new Date().getTime();
    const res = await enemiesRepository.findNotNull();
    Promise.all(
      res
        .filter(
          (enemy) => enemy.deletedAt !== null && nowTime - enemy.deletedAt.getTime() > RESPAWN_TIME
        )
        .map((enemy) => enemiesRepository.update(enemy.id, null))
    ).then((results) =>
      results.forEach((result) => {
        result;
      })
    );
  },
  createAll: async () => {
    const res = await enemyTable();
    if (res === null) {
      enemyUseCase.createAll();
    } else {
      Promise.all(
        res.map((tables, displayNumberMinus1) =>
          tables.map((table) => {
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
            return enemiesRepository.create(newEnemy);
          })
        )
      ).then((results) =>
        results.flat().forEach((result) => {
          result;
        })
      );
    }
  },
};
