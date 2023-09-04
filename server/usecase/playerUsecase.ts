import assert from 'assert';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import type { UserId } from '../commonTypesWithClient/branded';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { playerRepository } from '../repository/playerRepository';
import { userIdParser } from '../service/idParsers';

export type MoveDirection = { x: number; y: number };

//moveDirectionの値をzodでバリデーションする
const MoveDirectionSchema = z.object({
  x: z.number().min(-1).max(1),
  y: z.number().min(-1).max(1),
});
export const playerUseCase = {
  findMany: async (isPlaying: boolean | undefined = undefined): Promise<PlayerModel[]> => {
    if (isPlaying === undefined) {
      const players: PlayerModel[] = await playerRepository.findAll();

      return players;
    }

    const players: PlayerModel[] = await playerRepository.findPlayingOrDead(isPlaying);

    return players;
  },
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
      isPlaying: true,
    };
    await playerRepository.save(playerData);
    return playerData;
  },
  move: async (moveDirection: MoveDirection, userId: UserId): Promise<PlayerModel | null> => {
    const currentPlayerInfo = await playerRepository.find(userId);
    if (currentPlayerInfo === null) return null;
    const validatedMoveDirection = MoveDirectionSchema.parse(moveDirection);

    const updatePlayerInfo: PlayerModel = {
      ...currentPlayerInfo,
      pos: {
        x: currentPlayerInfo.pos.x + validatedMoveDirection.x * currentPlayerInfo.vector.x,
        y: currentPlayerInfo.pos.y + validatedMoveDirection.y * currentPlayerInfo.vector.y,
      },
    };
    await playerRepository.save(updatePlayerInfo);
    return updatePlayerInfo;
  },
  addScore: async (userId: UserId, score: number): Promise<PlayerModel | null> => {
    const currentPlayerInfo = await playerRepository.find(userId);
    assert(currentPlayerInfo);
    const updatePlayerInfo: PlayerModel = {
      ...currentPlayerInfo,
      score: currentPlayerInfo.score + score,
    };
    await playerRepository.save(updatePlayerInfo);
    return updatePlayerInfo;
  },
  getStatus: async (userId: UserId) => {
    const currentPlayerInfo = await playerRepository.find(userId);
    if (currentPlayerInfo === null) return null;
    return currentPlayerInfo;
  },
  finishGame: async (userId: UserId) => {
    const currentPlayerInfo = await playerRepository.find(userId);

    if (currentPlayerInfo === null) return null;
    const updatePlayerInfo: PlayerModel = {
      ...currentPlayerInfo,
      isPlaying: false,
    };

    await playerRepository.save(updatePlayerInfo);

    return updatePlayerInfo;
  },
};
