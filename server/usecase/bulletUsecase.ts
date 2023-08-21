import type { BulletId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletRepository } from '$/repository/bulletRepository';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const bulletUsecase = {
  creat: async (shooterId: string): Promise<BulletModel> => {
    //弾の初期値
    const bulletData: BulletModel = {
      bulletId: bulletIdParser.parse(randomUUID()),
      shooterId,
      power: 1,
      vector: { x: 5, y: 0 },
      pos: { x: 50, y: 300 },
      type: 1,
      side: 'left',
    };
    await bulletRepository.save(bulletData);
    return bulletData;
  },
  move: async (bulletId: BulletId): Promise<BulletModel | null> => {
    const recentlyBulletInfo = await bulletRepository.find(bulletId);
    if (recentlyBulletInfo === null) return null;
    const updateBulletInfo: BulletModel = {
      ...recentlyBulletInfo,
      pos: {
        x: recentlyBulletInfo.pos.x + recentlyBulletInfo.vector.x,
        y: recentlyBulletInfo.pos.y + recentlyBulletInfo.vector.y,
      },
    };
    await bulletRepository.save(updateBulletInfo);
    return updateBulletInfo;
  },
  delete: async (bulletId: BulletId): Promise<BulletModel | null> => {
    const recentlyBulletInfo = await bulletRepository.find(bulletId);
    if (recentlyBulletInfo === null) return null;
    await bulletRepository.delete(bulletId);
    return recentlyBulletInfo;
  },
};
const getBulletList = async () => {
  const newBulletList = await bulletRepository.findAll();
  for (const bullet of newBulletList) {
    //画面外に出た弾を削除する
    if (bullet.pos.x > 1920 || bullet.pos.x < 0) {
      bulletUsecase.delete(bullet.bulletId);
    }
    //100msごとにUseCaseを呼び出して弾を動かす
    bulletUsecase.move(bullet.bulletId);
  }
};
setInterval(getBulletList, 100);
