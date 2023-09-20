import { PLAYER_HALF_WIDTH } from '$/commonConstantsWithClient';
import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletRepository } from '$/repository/bulletRepository';
import { playerRepository } from '$/repository/playerRepository';
import { randomUUID } from 'crypto';
import { computeAllowedMoveX } from './computeAllowedMoveX';
import { bulletIdParser } from './idParsers';
import { sideToDirectionX } from './sideToDirectionX';

export const shootType = {
  normal: async (shooterId: UserId): Promise<BulletModel | null> => {
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
  burst: async (shooterId: UserId): Promise<BulletModel[] | null> => {
    const shooterInfo = await playerRepository.find(shooterId);
    if (shooterInfo === null) return null;

    const newBullets: BulletModel[] = [
      {
        id: bulletIdParser.parse(randomUUID()),
        direction: {
          x: sideToDirectionX(shooterInfo.side),
          y: 0,
        },
        createdPos: {
          x:
            computeAllowedMoveX(shooterInfo) +
            PLAYER_HALF_WIDTH * sideToDirectionX(shooterInfo.side),
          y: shooterInfo.pos.y,
        },
        createdAt: Date.now(),
        side: shooterInfo.side,
        shooterId,
      },
      {
        id: bulletIdParser.parse(randomUUID()),
        direction: {
          x: sideToDirectionX(shooterInfo.side),
          y: 0,
        },
        createdPos: {
          x:
            computeAllowedMoveX(shooterInfo) +
            PLAYER_HALF_WIDTH * sideToDirectionX(shooterInfo.side) +
            50 * sideToDirectionX(shooterInfo.side),
          y: shooterInfo.pos.y,
        },
        createdAt: Date.now(),
        side: shooterInfo.side,
        shooterId,
      },
      {
        id: bulletIdParser.parse(randomUUID()),
        direction: {
          x: sideToDirectionX(shooterInfo.side),
          y: 0,
        },
        createdPos: {
          x:
            computeAllowedMoveX(shooterInfo) +
            PLAYER_HALF_WIDTH * sideToDirectionX(shooterInfo.side) +
            100 * sideToDirectionX(shooterInfo.side),
          y: shooterInfo.pos.y,
        },
        createdAt: Date.now(),
        side: shooterInfo.side,
        shooterId,
      },
    ];
    newBullets.forEach(async (bullet) => {
      await bulletRepository.create(bullet);
    });
    return newBullets;
  },
};
