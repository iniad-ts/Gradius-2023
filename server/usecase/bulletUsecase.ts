import type { UserId } from '$/commonTypesWithClient/branded';
import { bulletRepository } from '$/repository/bulletRepository';
import { playerRepository } from '$/repository/playerRepository';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import type { BulletModel } from '../commonTypesWithClient/models';

let intervalId: NodeJS.Timeout | null = null;
export const bulletUsecase = {
  init() {
    intervalId = setInterval(() => {
      bulletUsecase.update();
    }, 75);
  },
  stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
  create: async (shooterId: UserId): Promise<BulletModel | null> => {
    const shooterInfo = await playerRepository.find(shooterId);
    if (shooterInfo === null) return null;
    const newBullet: BulletModel = {
      bulletId: bulletIdParser.parse(randomUUID()),
      shooterId,
      power: 1,
      vector: { x: 10, y: 0 },
      pos: { x: shooterInfo.pos.x, y: shooterInfo.pos.y + 50 }, //プレイヤーの中央から発射する
      type: 1,
      side: shooterInfo.side,
    };
    await bulletRepository.save(newBullet);
    return newBullet;
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
  delete: async (bulletModel: BulletModel): Promise<BulletModel | null> => {
    const currentBulletInfo = await bulletRepository.find(bulletModel.bulletId);
    if (currentBulletInfo === null) return null;
    await bulletRepository.delete(bulletModel.bulletId);
    return currentBulletInfo;
  },
  update: async () => {
    const currentBulletList = await bulletRepository.findAll();
    const promises = currentBulletList.map((bullet) => {
      // 画面外に出た弾を削除する、それ以外は移動する
      if (bullet.pos.x > 1920 || bullet.pos.x < 0) {
        return bulletUsecase.delete(bullet);
      } else {
        return bulletUsecase.move(bullet);
      }
    });
    await Promise.all(promises);
  },
};
