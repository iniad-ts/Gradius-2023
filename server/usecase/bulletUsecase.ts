import { BULLET_RADIUS, PLAYER_HALF_WIDTH, SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { UserId } from '$/commonTypesWithClient/branded';
import { bulletRepository } from '$/repository/bulletRepository';
import { playerRepository } from '$/repository/playerRepository';
import { computeAllowedMoveX } from '$/service/computeAllowedMoveX';
import { entityChangeWithPos } from '$/service/entityChangeWithPos';
import { bulletIdParser } from '$/service/idParsers';
import { sideToDirectionX } from '$/service/sideToDirectionX';
import { randomUUID } from 'crypto';
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

  create: async (shooterId: UserId): Promise<BulletModel | null> => {
    const shooterInfo = await playerRepository.find(shooterId);
    if (shooterInfo === null) return null;

    const newBullet: BulletModel = {
      id: bulletIdParser.parse(randomUUID()),
      direction: {
        x: sideToDirectionX(shooterInfo.side),
        y: 0,
      },
      createdPos: {
        x:
          computeAllowedMoveX(shooterInfo) + PLAYER_HALF_WIDTH * sideToDirectionX(shooterInfo.side),
        y: shooterInfo.pos.y,
      },
      createdAt: Date.now(),
      side: shooterInfo.side,
      shooterId,
    };

    return await bulletRepository.create(newBullet);
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
