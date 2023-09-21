import { BULLET_RADIUS, SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { UserId } from '$/commonTypesWithClient/branded';
import { bulletRepository } from '$/repository/bulletRepository';
import { playerRepository } from '$/repository/playerRepository';
import { entityChangeWithPos } from '$/service/entityChangeWithPos';
import { shootType } from '$/service/shootType';
import type { BulletModel, BulletModelWithPos } from '../commonTypesWithClient/models';

let intervalId: NodeJS.Timeout | null = null;
const BULLET_UPDATE_INTERVAL = 25;

export const bulletUseCase = {
  init: () => {
    intervalId = setInterval(() => {
      bulletUseCase.update();
    }, BULLET_UPDATE_INTERVAL);
  },

  stop: () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },

  shoot: async (shooterId: UserId): Promise<void> => {
    const shooterInfo = await playerRepository.find(shooterId);
    if (shooterInfo === null) return;
    if (shooterInfo.usingItem === 'burst') {
      await shootType.burst(shooterId);
      return;
    }
    await shootType.normal(shooterId);
  },

  delete: async (bulletModel: BulletModel) => {
    await bulletRepository.delete(bulletModel.id);
  },

  update: async () => {
    await bulletRepository.deleteByCreatedTime();
  },

  getBulletsByDisplay: async (displayNumber: number): Promise<BulletModelWithPos[]> => {
    const bullets = await bulletRepository.findAll();

    const getBulletsByDisplay = bullets
      .map(entityChangeWithPos)
      .filter(
        (bullet) =>
          bullet.pos.x + BULLET_RADIUS > SCREEN_WIDTH * displayNumber &&
          bullet.pos.x - BULLET_RADIUS < SCREEN_WIDTH * (displayNumber + 1)
      ) as BulletModelWithPos[];

    return getBulletsByDisplay;
  },
};
