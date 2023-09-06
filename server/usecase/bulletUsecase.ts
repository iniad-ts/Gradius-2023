import type { UserId } from '$/commonTypesWithClient/branded';
import { bulletRepository } from '$/repository/bulletRepository';
import { gameRepository } from '$/repository/gameRepository';
import { playerRepository } from '$/repository/playerRepository';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import type { BulletModel } from '../commonTypesWithClient/models';

let intervalId: NodeJS.Timeout | null = null;
export const bulletUseCase = {
  init: () => {
    intervalId = setInterval(() => {
      bulletUseCase.update();
    }, 25);
  },
  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
  create: async (shooterId: UserId): Promise<BulletModel | null> => {
    const shooterInfo = await playerRepository.find(shooterId);
    if (shooterInfo === null) return null;
    if (shooterInfo.side === 'left') {
      const newBullet: BulletModel = {
        bulletId: bulletIdParser.parse(randomUUID()),
        shooterId,
        power: 1,
        vector: { x: 10, y: 0 },
        pos: { x: shooterInfo.pos.x, y: shooterInfo.pos.y },
        type: 1,
        side: shooterInfo.side,
      };
      await bulletRepository.save(newBullet);
      return newBullet;
    } else {
      const newBullet: BulletModel = {
        bulletId: bulletIdParser.parse(randomUUID()),
        shooterId,
        power: 1,
        vector: { x: -10, y: 0 },
        pos: { x: shooterInfo.pos.x, y: shooterInfo.pos.y },
        type: 1,
        side: shooterInfo.side,
      };
      await bulletRepository.save(newBullet);
      return newBullet;
    }
  },
  move: async (bulletModel: BulletModel): Promise<BulletModel | null> => {
    const currentBulletInfo = await bulletRepository.find(bulletModel.bulletId);
    if (currentBulletInfo === null) return null;
    const updateBulletInfo: BulletModel = {
      ...currentBulletInfo,
      pos: {
        x: currentBulletInfo.pos.x + currentBulletInfo.vector.x,
        y: currentBulletInfo.pos.y + currentBulletInfo.vector.y,
      },
    };
    await bulletRepository.save(updateBulletInfo);
    return updateBulletInfo;
  },
  delete: async (bulletModel: BulletModel) => {
    try {
      await bulletRepository.delete(bulletModel.bulletId);
    } catch (e) {
      console.error(e);
    }
  },
  update: async () => {
    const currentBulletList = await bulletRepository.findAll();
    const game = await gameRepository.find();
    const promises = currentBulletList.map((bullet) => {
      if (bullet.pos.x > 1920 * (game?.displayNumber ?? 0)) {
        return bulletUseCase.delete(bullet);
      } else {
        return bulletUseCase.move(bullet);
      }
    });
    await Promise.all(promises);
  },
  getBulletByDisplayNumber: async (displayNumber: number) => {
    const bullets = await bulletRepository.findAll();
    const bulletsByDisplayNumber = bullets.filter((bullet) => {
      if (typeof bullet.pos.x === 'number') {
        return Math.floor(bullet.pos.x / 1920) === displayNumber;
      }
      return [];
    });
    return bulletsByDisplayNumber;
  },
};
