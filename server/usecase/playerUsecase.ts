import { randomUUID } from 'crypto';
import {
  DEFAULT_PLAYER_MOVE_SPEED,
  DISPLAY_COUNT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../commonConstantsWithClient';
import type { UserId } from '../commonTypesWithClient/branded';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { playerRepository } from '../repository/playerRepository';
import { computeAllowedMoveX } from '../service/computeAllowedMoveX';
import { userIdParser } from '../service/idParsers';
import { itemHandler } from '../service/itemhandler';
import { minMax } from '../service/minMax';
import { itemsData, type Item } from './../commonConstantsWithClient/item';

export type MoveDirection = { x: number; y: number };

const isOutOfGameDisplay = (
  pos: { x: number; y: number },
  side: 'left' | 'right',
  displayNumber: number
) => {
  const terms = [
    side === 'left' && pos.x >= SCREEN_WIDTH * displayNumber - 1,
    side === 'right' && pos.x <= 0,
  ];
  return terms.some(Boolean);
};

const isInThisDisplay = (posX: number, displayNumber: number) => {
  const lowerBound = SCREEN_WIDTH * displayNumber;
  const upperBound = SCREEN_WIDTH * (displayNumber + 1);
  return posX >= lowerBound && posX < upperBound;
};

const computeScroll = (player: PlayerModel) => {
  if (player.isPlaying === false) return player;
  const newPlayer = {
    ...player,
    pos: {
      ...player.pos,
      x: computeAllowedMoveX(player),
    },
  };
  return newPlayer;
};

export const playerUseCase = {
  create: async (name: string): Promise<PlayerModel> => {
    const [leftCount, rightCount] = await Promise.all([
      playerRepository.countInSide('left'),
      playerRepository.countInSide('right'),
    ]);
    const side = leftCount <= rightCount ? 'left' : 'right';
    const x = side === 'left' ? 50 : SCREEN_WIDTH * DISPLAY_COUNT - 50;

    const playerData: PlayerModel = {
      id: userIdParser.parse(randomUUID()),
      pos: { x, y: SCREEN_HEIGHT / 2 },
      name,
      score: 0,
      Items: [],
      side,
      isPlaying: true,
      speed: DEFAULT_PLAYER_MOVE_SPEED,
      startedAt: Date.now(),
    };

    return await playerRepository.save(playerData);
  },

  move: async (moveDirection: MoveDirection, userId: UserId): Promise<PlayerModel | null> => {
    const currentPlayer = await playerRepository.find(userId);

    if (currentPlayer === null) return null;

    const newPos = {
      x: minMax(
        currentPlayer.pos.x + moveDirection.x * currentPlayer.speed,
        0,
        SCREEN_WIDTH * DISPLAY_COUNT
      ),
      y: minMax(
        Math.max(currentPlayer.pos.y + moveDirection.y * currentPlayer.speed),
        0,
        SCREEN_HEIGHT
      ),
    };

    const allowedPos = {
      ...newPos,
      x: computeAllowedMoveX({ ...currentPlayer, pos: newPos }),
    };
    const updatePlayerInfo: PlayerModel = {
      ...currentPlayer,
      pos: allowedPos,
    };
    return await playerRepository.save(updatePlayerInfo);
  },
  useitem: async (userId: UserId, items: Item[]) => {
    const currentPlayer = await playerRepository.find(userId);
    if (currentPlayer === null) return null;
    const handler = itemHandler[items[0].name];
    if (handler === undefined) return null;
    return await handler(currentPlayer);
  },

  addScore: async (userId: UserId, score: number): Promise<PlayerModel | null> => {
    const currentPlayer = await playerRepository.find(userId);
    if (currentPlayer === null) return null;
    return await playerRepository.saveScore(userId, currentPlayer.score + score);
  },
  addItem: async (userId: UserId): Promise<PlayerModel | null> => {
    const currentPlayer = await playerRepository.find(userId);
    if (currentPlayer === null) return null;
    const currentItems = currentPlayer.Items ?? [];

    return await playerRepository.saveItem(userId, [
      ...currentItems,
      itemsData[Math.floor(Math.random() * itemsData.length)],
    ]);
  },

  finishGame: async (currentPlayerInfo: PlayerModel) => {
    const updatePlayerInfo: PlayerModel = {
      ...currentPlayerInfo,
      isPlaying: false,
    };
    return await playerRepository.save(updatePlayerInfo);
  },

  getPlayersByDisplay: async (displayNumber: number) => {
    const players = await playerRepository.findAll();
    const playersInDisplay: PlayerModel[] = [];

    players.forEach((curr) => {
      if (curr.isPlaying === false) {
        return;
      }

      const newPlayer = computeScroll(curr);
      if (!isInThisDisplay(newPlayer.pos.x, displayNumber)) {
        return;
      }

      if (isOutOfGameDisplay(newPlayer.pos, newPlayer.side, DISPLAY_COUNT)) {
        playerUseCase.finishGame(curr);
        return;
      }
      playersInDisplay.push(newPlayer);
    });

    return playersInDisplay;
  },

  getAllPlayers: async () => {
    const players = await playerRepository.findAll();
    const allPlayers: PlayerModel[] = [];

    players.forEach((curr) => {
      if (curr.isPlaying === false) {
        return;
      }

      const newPlayer = computeScroll(curr);
      allPlayers.push(newPlayer);
    });

    return allPlayers;
  },
};
