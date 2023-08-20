import assert from 'assert';
import { randomUUID } from 'crypto';
import type { UserId } from '../commonTypesWithClient/branded';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { playerRepository } from '../repository/playerRepository';
import { userIdParser } from '../service/idParsers';

export type MoveDirection = { x: number; y: number };

export const playerUsecase = {
  create: async (name: string): Promise<PlayerModel | null> => {
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
  move: async (movedirection: MoveDirection, userid: UserId): Promise<PlayerModel | null> => {
    const recentlyPlayerInfo = await playerRepository.find(userid);
    assert(recentlyPlayerInfo);
    const updatePlayerInfo: PlayerModel = {
      ...recentlyPlayerInfo,
      pos: {
        x: recentlyPlayerInfo.pos.x + movedirection.x * recentlyPlayerInfo.vector.x,
        y: recentlyPlayerInfo.pos.y + movedirection.y * recentlyPlayerInfo.vector.y,
      },
    };
    await playerRepository.save(updatePlayerInfo);
    return updatePlayerInfo;
  },
  addScore: async (userid: UserId, score: number): Promise<PlayerModel | null> => {
    const recentlyPlayerInfo = await playerRepository.find(userid);
    assert(recentlyPlayerInfo);
    const updatePlayerInfo: PlayerModel = {
      ...recentlyPlayerInfo,
      score: recentlyPlayerInfo.score + score,
    };
    await playerRepository.save(updatePlayerInfo);
    return updatePlayerInfo;
  },
};
