import { bulletRepository } from '$/repository/bulletRepository';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import type { BulletModel } from '../commonTypesWithClient/models';

export const bulletUsecase = {
  create: async (shooterId: string): Promise<BulletModel> => {
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
  move: async (bulletModel: BulletModel): Promise<BulletModel | null> => {
    const recentlyBulletInfo = await bulletRepository.find(bulletModel.bulletId);
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
  delete: async (bulletModel: BulletModel): Promise<BulletModel | null> => {
    const recentlyBulletInfo = await bulletRepository.find(bulletModel.bulletId);
    if (recentlyBulletInfo === null) return null;
    await bulletRepository.delete(bulletModel.bulletId);
    return recentlyBulletInfo;
  },
  update: async () => {
    const newBulletList = await bulletRepository.findAll();
    const updatedBulletList: BulletModel[] = [];
    for (const bullet of newBulletList) {
      //画面外に出た弾を削除する
      if (bullet.pos.x > 1920 || bullet.pos.x < 0) {
        bulletUsecase.delete(bullet);
      }
      //UseCaseを呼び出して弾を動かす
      const updartedBullet = await bulletUsecase.move(bullet);
      if (updartedBullet !== null) updatedBulletList.push(updartedBullet);
    }
  },
};
