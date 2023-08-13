import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyTable } from '$/constants/enemyTable';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { enemyIdParser } from '$/service/idParsers';
import { isInDisplay } from '$/service/isInDisplay';
import { randomUUID } from 'crypto';
import { bulletUseCase } from './bulletUseCase';
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
  findAll: async (displayNumber: number) => {
    const res = (await enemiesRepository.findAll()) ?? [];
    const enemiesInDisplay = res.filter((enemy) =>
      isInDisplay(displayNumber, enemy.createdPosition.x)
    );
    return enemiesInDisplay;
  },
  kill: async (enemyId: string, userId: UserId) => {
    await enemiesRepository.update(enemyId, new Date());
    const userStatus = await playerUseCase.getStatus(userId);
    if (userStatus !== null) {
      await playersRepository.save({ ...userStatus, score: userStatus.score + 1 });
    }
  },
  respawn: async () => {
    const nowTime = new Date().getTime();
    const res = await enemiesRepository.findNotNull();
    Promise.all(
      res
        .filter((enemy) => enemy.deletedAt !== null && nowTime - enemy.deletedAt > RESPAWN_TIME)
        .map((enemy) => enemiesRepository.update(enemy.id, null))
    ).then((results) =>
      results.forEach((result) => {
        result;
      })
    );
  },
  shot2: async () => {
    const res = await enemiesRepository.findType(2);
    Promise.all(
      res.map((enemy) =>
        bulletUseCase.createByEnemy({ x: enemy.createdPosition.x, y: enemy.createdPosition.y })
      )
    ).then((results) =>
      results.forEach((result) => {
        result;
      })
    );
  },
  shot3: async () => {
    const res = await enemiesRepository.findType(3);
    const players = await playersRepository.findAll();
    Promise.all(
      res.map((enemy) => {
        const lockOnPlayerPos = players
          .map((player) => ({
            pos: { ...player.position },
            distance:
              (player.position.x - enemy.createdPosition.x) ** 2 +
              (player.position.y - enemy.createdPosition.y) ** 2,
          }))
          .sort((a, b) => a.distance - b.distance)[0].pos;
        const dir = Math.atan(
          (lockOnPlayerPos.y - enemy.createdPosition.y) /
            (lockOnPlayerPos.x - enemy.createdPosition.x)
        );
        return bulletUseCase.createByEnemy(
          {
            x: enemy.createdPosition.x,
            y: enemy.createdPosition.y,
          },
          dir
        );
      })
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
