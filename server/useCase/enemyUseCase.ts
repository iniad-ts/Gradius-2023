import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyTable } from '$/constants/enemyTable';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { enemyIdParser } from '$/service/idParsers';
import { isInDisplay } from '$/service/isInDisplay';
import { randomUUID } from 'crypto';
import { bulletUseCase } from './bulletUseCase';

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
      type: Math.floor(Math.random() * 3) + 1,
    };
    await enemiesRepository.create(newEnemy);
  },
  findInDisplay: async (displayNumber: number) => {
    const res = (await enemiesRepository.findAll()) ?? [];
    const enemiesInDisplay = res
      .filter((enemy) => isInDisplay(displayNumber, enemy.createdPosition.x))
      .map((enemy) => ({
        ...enemy,
        createdPosition: {
          ...enemy.createdPosition,
          x: enemy.createdPosition.x - 1920 * displayNumber,
        },
      }));
    return enemiesInDisplay;
  },
  kill: async (enemyId: string, userId: UserId) => {
    const enemyStatus = await enemiesRepository.find(enemyId);
    if (enemyStatus?.deletedAt !== null) {
      return;
    }
    await enemiesRepository.update(enemyId, new Date());
    const userStatus = await playersRepository.find(userId);
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
        const lockOnPlayer = sortByDistance(players, enemy)[0];
        const diffX = lockOnPlayer.pos.x - enemy.createdPosition.x;
        const diffY = lockOnPlayer.pos.y - enemy.createdPosition.y;
        const normalization = 1 / Math.sqrt(lockOnPlayer.distance2);
        const dir = {
          x: diffX * normalization,
          y: diffY * normalization,
        };
        return bulletUseCase.createByEnemy({ ...enemy.createdPosition }, dir);
      })
    ).then((results) =>
      results.forEach((result) => {
        result;
      })
    );
  },
  shot4: async () => {
    const res = await enemiesRepository.findType(3);
    const players = await playersRepository.findAll();
    Promise.all(
      res.map((enemy) => {
        const lockOnPlayer = sortByDistance(players, enemy)[0];
        const subShotPlaces = (numOfBullet: number) =>
          [...Array(numOfBullet)].map((_, i) => {
            const subPlaceX = lockOnPlayer.pos.y * 0.1 * (i + 1);
            const subPlaceY = lockOnPlayer.pos.x * 0.1 * (i + 1);
            return [1, -1].map((i) => ({
              x: lockOnPlayer.pos.x + subPlaceX * i,
              y: lockOnPlayer.pos.y + subPlaceY * i,
            }));
          });

        const returnVoid = subShotPlaces(2)
          .flat()
          .map((pos) => {
            const normalization = Math.sqrt(
              (pos.x - enemy.createdPosition.x) ** 2 + (pos.y - enemy.createdPosition.y) ** 2
            );
            const diffX = pos.x - enemy.createdPosition.x;
            const diffY = pos.y - enemy.createdPosition.y;
            return bulletUseCase.createByEnemy(
              { ...enemy.createdPosition },
              { x: diffX * normalization, y: diffY * normalization }
            );
          });
        return returnVoid;
      })
    ).then((results) =>
      results.forEach((result) => {
        result;
      })
    );
  },
  createAll: async (displayNumber: number) => {
    const res = enemyTable(displayNumber);
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
      );
    }
  },
};
