import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { gamesRepository } from '$/repository/gamesRepository';
import { bulletIdParser } from '$/service/idParsers';
import { isInDisplay } from '$/service/isInDisplay';
import { posWithDirSpeTim as posWithBulletModel } from '$/service/posWithDirSpeTim';
import { randomUUID } from 'crypto';

export const bulletUseCase = {
  create: async (player: PlayerModel, direction = { x: 1, y: 0 }): Promise<BulletModel | null> => {
    if (player !== null) {
      const newBullet: BulletModel = {
        id: bulletIdParser.parse(randomUUID()),
        createdPosition: {
          ...player.position,
        },
        direction: { x: 1, y: 0 },
        type: 0,
        playerId,
        createdAt: Date.now(),
      };
      await bulletsRepository.create(newBullet);
      return newBullet;
    }
    return null;
  },
  createByEnemy: async (pos: { x: number; y: number }, dir = { x: -1, y: 0 }) => {
    const newBullet: BulletModel = {
      id: bulletIdParser.parse(randomUUID()),
      createdPosition: {
        ...pos,
      },
      direction: dir,
      type: 0,
      playerId: undefined,
      createdAt: Date.now(),
    };
    await bulletsRepository.create(newBullet);
  },
  delete: async () => {
    const bullets = [
      ...(await bulletsRepository.findAllOfPlayers()),
      ...(await bulletsRepository.findAllOfEnemies()),
    ];
    const game = await gamesRepository.find();
    const maxXPosition = ((game?.displayNumber ?? -1) + 1) * 1920;
    const deleteBullets = bullets.filter((bullet) => {
      const [x, y] = posWithBulletModel(bullet);
      return x < 0 || maxXPosition < x || y < 0 || 1080 < y;
    });
    deleteBullets.forEach((bullet) => {
      bulletsRepository.delete(bullet.id);
    });
  },
  findInDisplay: async (displayNumber: number) => {
    const res1 = (await bulletsRepository.findAllOfPlayers()) ?? [];
    const res2 = (await bulletsRepository.findAllOfEnemies()) ?? [];
    const [bulletsInDisplay1, bulletsInDisplay2] = [res1, res2].map((res) =>
      res
        .filter((bullet) => isInDisplay(displayNumber, posWithBulletModel(bullet)[0]))
        .map((bullet) => ({
          ...bullet,
          createdPosition: {
            ...bullet.createdPosition,
            x: bullet.createdPosition.x - 1920 * displayNumber,
          },
        }))
    );
    return {
      players: bulletsInDisplay1,
      enemies: bulletsInDisplay2,
    };
  },
};
