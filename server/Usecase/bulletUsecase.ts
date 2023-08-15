import { BulletRepository } from '$/Repository/bulletRepository';
import { playerRepository } from '$/Repository/playerRepository';
import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { BulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const bulletUsecase = {
  createBullet: async (userId: UserId) => {
    //bulletの初期ステータス
    const recentlyBulletInfo = await playerRepository.read(userId);
    const newBullet: BulletModel = {
      bulletId: BulletIdParser.parse(randomUUID()),
      userId,
      pos: { x: recentlyBulletInfo.pos.x, y: recentlyBulletInfo.pos.y },
      attack: 5,
    };
    await BulletRepository.save(newBullet);
    return 'bulletの情報が入力されました';
  },
  moveBullet: async () => {
    const bullets = await BulletRepository.getBullets();
    for (const s of bullets) {
      if (s.pos.x + 1 <= 15000) {
        const updateBulletInfo: BulletModel = {
          bulletId: s.bulletId,
          userId: s.userId,
          pos: { x: s.pos.x + 1, y: s.pos.y },
          attack: s.attack,
        };
        await BulletRepository.save(updateBulletInfo);
      }
    }
  },
  getBullets: async () => {
    return await BulletRepository.getBullets();
  },
};
