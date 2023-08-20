import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerRepository } from '$/repository/playerRepository';
import { userIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';

export type MoveDirection = { x: number; y: number };

export const playerUsecase = {
  createNewPlayer: async (name: string) => {
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
  movePlayer: async (movedirection: MoveDirection, userid: UserId) => {
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
  },
  addScorePlayer: async (userid: UserId, score: number) => {
    const recentlyPlayerInfo = await playerRepository.find(userid);
    assert(recentlyPlayerInfo);
    const updatePlayerInfo: PlayerModel = {
      ...recentlyPlayerInfo,
      score: recentlyPlayerInfo.score + score,
    };
    await playerRepository.save(updatePlayerInfo);
  },
};
