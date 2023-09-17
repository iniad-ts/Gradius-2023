import {
  DEFAULT_PLAYER_MOVE_SPEED,
  DISPLAY_COUNT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPEED_BOOST_DURATION_MS,
} from '$/commonConstantsWithClient';
import { minMax } from '$/service/minMax';
import { randomUUID } from 'crypto';
import type { UserId } from '../commonTypesWithClient/branded';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { playerRepository } from '../repository/playerRepository';
import { computeAllowedMoveX } from '../service/computeAllowedMoveX';
import { userIdParser } from '../service/idParsers';

export type MoveDirection = { x: number; y: number };

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
  useitem: async (userId: UserId, itemId: string) => {
    interface ItemHandlers {
      [key: string]: (player: PlayerModel) => Promise<void>;
    }
    const itemHandler: ItemHandlers = {
      speed: async (player: PlayerModel) => {
        try {
          // 15秒間スピードアップ
          const updatePlayerInfo: PlayerModel = {
            ...player,
            speed: DEFAULT_PLAYER_MOVE_SPEED * 2,
          };
          console.log('speed up', updatePlayerInfo.speed);
          await playerRepository.save(updatePlayerInfo);

          setTimeout(async () => {
            try {
              const currentPlayer = await playerRepository.find(player.id);
              if (currentPlayer === null) return null;
              const updatePlayerInfo: PlayerModel = {
                ...currentPlayer,
                speed: DEFAULT_PLAYER_MOVE_SPEED,
              };
              console.log('speed down');
              await playerRepository.save(updatePlayerInfo);
            } catch (error) {
              console.error('速度のリセットに失敗しました:', error);
            }
          }, SPEED_BOOST_DURATION_MS);
        } catch (error) {
          console.error('スピードアップに失敗しました:', error);
        }
      },
    };

    const currentPlayer = await playerRepository.find(userId);
    if (currentPlayer === null) return null;
    const handler = itemHandler[itemId];
    if (handler === undefined) return null;
    return await handler(currentPlayer);
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

  getPlayersByDisplay: async (displayNumber: number) => await getPlayers(displayNumber),
  getPlayersAll: async () => await getPlayers(),
};

const getPlayers = async (displayNumber?: number) => {
  const isOutOfGameDisplay = (
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

  const isInThisDisplay = (posX: number, displayNumber: number) => {
    return Math.floor(posX / SCREEN_WIDTH) === displayNumber;
  };

  const players = await playerRepository.findAll();

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

  const playersInDisplay = players.reduce((prev, curr) => {
    if (curr.isPlaying === false) {
      return [...prev];
    }

    const newPlayer = computeScroll(curr);
    if (displayNumber !== undefined && !isInThisDisplay(newPlayer.pos.x, displayNumber)) {
      return [...prev];
    }

    if (isOutOfGameDisplay(newPlayer.pos, newPlayer.side, DISPLAY_COUNT)) {
      playerUseCase.finishGame(curr);
      return [...prev];
    }
    return [...prev, newPlayer];
  }, [] as PlayerModel[]);
  return playersInDisplay;
};
