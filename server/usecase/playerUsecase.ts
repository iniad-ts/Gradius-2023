import { randomUUID } from 'crypto';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../commonConstantsWithClient';
import type { UserId } from '../commonTypesWithClient/branded';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { gameRepository } from '../repository/gameRepository';
import { playerRepository } from '../repository/playerRepository';
import { userIdParser } from '../service/idParsers';

export type MoveDirection = { x: number; y: number };

export const playerUseCase = {
  create: async (name: string): Promise<PlayerModel> => {
    const [leftCount, rightCount] = await Promise.all([
      playerRepository.countInSide('left'),
      playerRepository.countInSide('right'),
    ]);

    const playerData: PlayerModel = {
      id: userIdParser.parse(randomUUID()),
      pos: { x: 50, y: SCREEN_HEIGHT / 2 },
      name,
      score: 0,
      Items: [],
      side: leftCount <= rightCount ? 'left' : 'right',
      isPlaying: true,
    };

    return await playerRepository.save(playerData);
  },

  move: async (moveDirection: MoveDirection, userId: UserId): Promise<PlayerModel | null> => {
    const displayNumber = (await gameRepository.find().then((game) => game?.displayNumber)) ?? 1;
    const isOutOfDisplay = (
      pos: { x: number; y: number },
      side: 'left' | 'right',
      displayNumber: number
    ) => {
      const terms = [
        side === 'left' && pos.x >= SCREEN_WIDTH * displayNumber,
        side === 'right' && pos.x <= 0,
      ];
      return terms.some(Boolean);
    };

    const currentPlayer = await playerRepository.find(userId);
    if (currentPlayer === null) return null;

    const newPos = {
      x: Math.min(
        Math.max(currentPlayer.pos.x + moveDirection.x * 5, 0),
        SCREEN_WIDTH * displayNumber
      ),
      y: Math.min(Math.max(currentPlayer.pos.y + moveDirection.y * 5, 0), SCREEN_HEIGHT),
    };

    if (isOutOfDisplay(newPos, currentPlayer.side, displayNumber)) {
      await playerUseCase.finishGame(currentPlayer);
      return null;
    }
    const updatePlayerInfo: PlayerModel = {
      ...currentPlayer,
      pos: newPos,
    };

    return await playerRepository.save(updatePlayerInfo);
  },

  addScore: async (userId: UserId, score: number): Promise<PlayerModel | null> => {
    const currentPlayer = await playerRepository.find(userId);
    if (currentPlayer === null) return null;

    return await playerRepository.saveScore(userId, currentPlayer.score + score);
  },

  finishGame: async (currentPlayerInfo: PlayerModel) => {
    const updatePlayerInfo: PlayerModel = {
      ...currentPlayerInfo,
      isPlaying: false,
    };

    return await playerRepository.save(updatePlayerInfo);
  },

  getPlayersInDisplay: async (displayNumber: number) => {
    const isInDisplay = (posX: number, displayNumber: number) => {
      return Math.floor(posX / SCREEN_WIDTH) === displayNumber;
    };
    const players = await playerRepository.findAll();

    const playersInDisplay = players.filter((player) => {
      return isInDisplay(player.pos.x, displayNumber) && player.isPlaying;
    });

    return playersInDisplay;
  },
};
