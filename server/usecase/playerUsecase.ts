import assert from 'assert';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import type { UserId } from '../commonTypesWithClient/branded';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { playerRepository } from '../repository/playerRepository';
import { userIdParser } from '../service/idParsers';

export type MoveDirection = { x: number; y: number };

//movedirectionの値をzodでバリデーションする
const MoveDirectionSchema = z.object({
  x: z.number().min(-1).max(1),
  y: z.number().min(-1).max(1),
});
export const playerUsecase = {
  create: async (name: string): Promise<PlayerModel> => {
    //playerの初期ステータス(デバッグ用)
    const playerData: PlayerModel = {
      userId: userIdParser.parse(randomUUID()),
      pos: { x: 50, y: 300 },
      name,
      score: 0,
      vector: { x: 5, y: 5 },
      Items: [],
      side: 'left',
    };
    await playerRepository.save(playerData);
    return playerData;
  },
  move: async (moveDirection: MoveDirection, userId: UserId): Promise<PlayerModel | null> => {
    const recentlyPlayerInfo = await playerRepository.find(userId);
    if (recentlyPlayerInfo === null) return null;
    const validatedMoveDirection = MoveDirectionSchema.parse(moveDirection);
    const updatePlayerInfo: PlayerModel = {
      ...recentlyPlayerInfo,
      pos: {
        x: recentlyPlayerInfo.pos.x + validatedMoveDirection.x * recentlyPlayerInfo.vector.x,
        y: recentlyPlayerInfo.pos.y + validatedMoveDirection.y * recentlyPlayerInfo.vector.y,
      },
    };
    await playerRepository.save(updatePlayerInfo);
    return updatePlayerInfo;
  },
  addScore: async (userId: UserId, score: number): Promise<PlayerModel | null> => {
    const recentlyPlayerInfo = await playerRepository.find(userId);
    assert(recentlyPlayerInfo);
    const updatePlayerInfo: PlayerModel = {
      ...recentlyPlayerInfo,
      score: recentlyPlayerInfo.score + score,
    };
    await playerRepository.save(updatePlayerInfo);
    return updatePlayerInfo;
  },
};
