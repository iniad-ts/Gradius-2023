import { PLAYER_HALF_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { UserId } from '$/commonTypesWithClient/branded';
import { bulletRepository } from '$/repository/bulletRepository';
import { gameRepository } from '$/repository/gameRepository';
import { playerRepository } from '$/repository/playerRepository';
import { computePosition } from '$/service/computePositions';
import { bulletIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import type { BulletModel } from '../commonTypesWithClient/models';

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
        x: shooterInfo.side === 'left' ? 1 : -1,
        y: 0,
      },
      createdPos: {
        x: shooterInfo.pos.x + PLAYER_HALF_WIDTH * (shooterInfo.side === 'left' ? 1 : -1),
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
    const currentBulletList = await bulletRepository.findAll();
    const displayNumber = (await gameRepository.find().then((game) => game?.displayNumber)) ?? 1;

    const outOfDisplay = (pos: { x: number; y: number }) => {
      const terms = [
        pos.x < 0,
        pos.y < 0,
        pos.x > displayNumber * SCREEN_WIDTH,
        pos.y > SCREEN_HEIGHT,
      ];

      return terms.some(Boolean);
    };

    await Promise.all(
      currentBulletList
        .filter((bullet) => {
          const pos = computePosition(bullet);
          return outOfDisplay(pos);
        })
        .map(bulletUseCase.delete)
    );
  },

  getBulletInDisplay: async (displayNumber: number) => {
    const bullets = await bulletRepository.findAll();
    const bulletsByDisplayNumber = bullets.filter((bullet) => {
      const pos = computePosition(bullet);
      return Math.floor(pos.x / SCREEN_WIDTH) === displayNumber;
    });
    return bulletsByDisplayNumber;
  },
};
