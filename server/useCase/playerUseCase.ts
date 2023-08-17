import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel, LockOnModel, PlayerModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { gamesRepository } from '$/repository/gamesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { gameOver } from '$/service/gameOver';
import { userIdParser } from '$/service/idParsers';
import { isInDisplay } from '$/service/isInDisplay';
import { minmax } from '$/service/minmax';
import { posWithBulletModel } from '$/service/posWithBulletModel';
import { randomUUID } from 'crypto';
import { bulletUseCase } from './bulletUseCase';

export type MoveTo = {
  toX: number;
  toY: number;
};

const sortByDistance = (player: PlayerModel, enemies: EnemyModel[]): LockOnModel[] =>
  enemies
    .map((enemy) => ({
      pos: { ...enemy.createdPosition },
      squaredDistance:
        (player.position.x - enemy.createdPosition.x) ** 2 +
        (player.position.y - enemy.createdPosition.y) ** 2,
    }))
    .sort((a, b) => a.squaredDistance - b.squaredDistance);

export const playerUseCase = {
  move: async (id: UserId, moveTo: MoveTo): Promise<PlayerModel | null> => {
    const player: PlayerModel | null = await playersRepository.find(id);
    const displayNumber = (await gamesRepository.find())?.displayNumber;
    if (player === null || displayNumber === undefined) return null;
    const movedPlayer: PlayerModel = {
      ...player,
      position: {
        x: minmax(player.position.x + moveTo.toX * 5, 0, 1920 + 1920 * displayNumber),
        y: minmax(player.position.y + moveTo.toY * 5, 0, 1080),
      },
    };
    await playersRepository.save(movedPlayer);
    return movedPlayer;
  },
  hit: async (player: PlayerModel, bulletId: string, displayNumber: number) => {
    const newPlayer = {
      ...player,
      health: player.health - 1,
      position: { ...player.position, x: player.position.x + 1920 * displayNumber },
    };
    await gameOver(player, newPlayer);
    await bulletsRepository.delete(bulletId);
  },
  create: async (userName: string): Promise<PlayerModel | null> => {
    const newPlayer: PlayerModel = {
      id: userIdParser.parse(randomUUID()),
      name: userName,
      position: {
        x: 150,
        y: 350,
      },
      createdAt: Date.now(),
      health: 5,
      score: 0,
      team: 'red',
    };
    await playersRepository.save(newPlayer);
    return newPlayer;
  },
  findInDisplay: async (displayNumber: number): Promise<PlayerModel[]> => {
    const res = await playersRepository.findAll();
    const playerInDisplay: PlayerModel[] = res
      .filter((player) => isInDisplay(displayNumber, player.position.x))
      .map((player) => ({
        ...player,
        position: { ...player.position, x: player.position.x - 1920 * displayNumber },
      }));
    return playerInDisplay;
  },
  item: {
    trackingBullets: async (player: PlayerModel) => {
      const res = await enemiesRepository.findNotNull();
      const lockOnEnemies = sortByDistance(player, res).filter(
        (enemy) => enemy.pos.x > player.position.x
      );
      if (lockOnEnemies.length === 0) return;
      Promise.all(
        lockOnEnemies.map((enemy) => {
          const diffX = enemy.pos.x - player.position.x;
          const diffY = enemy.pos.y - player.position.y;
          const normalization = 1 / Math.sqrt(enemy.squaredDistance);
          const dir = {
            x: diffX * normalization,
            y: diffY * normalization,
          };
          bulletUseCase.createByPlayer(player, dir);
        })
      ).then((results) =>
        results.forEach((result) => {
          result;
        })
      );
    },
    manyBullets: async (player: PlayerModel): Promise<void> => {
      const subShotYs = (numOfBullet: number) =>
        [...Array(numOfBullet)].map((_, i) => [-1, 1].map((n) => i * n));
      Promise.all(
        subShotYs(3)
          .flat()
          .map((y: number) => {
            const normalization = Math.sqrt(1 + y ** 2);
            const dir = {
              x: 1,
              y: y * normalization,
            };
            return bulletUseCase.createByPlayer(player, dir);
          })
      );
    },
    barrier: async (player: PlayerModel) => {
      const res = await bulletsRepository.findAllByEnemy();
      const deletingBullets = res.filter((bullet) => {
        const [x, y] = posWithBulletModel(bullet);
        const BARRIER_WIDTH = 100;
        return (player.position.x - x) ** 2 + (player.position.y - y) ** 2 < BARRIER_WIDTH;
      });
      Promise.all(deletingBullets.map((bullet) => bulletsRepository.delete(bullet.id))).then(
        (results) =>
          results.forEach((result) => {
            result;
          })
      );
    },
  },
};
