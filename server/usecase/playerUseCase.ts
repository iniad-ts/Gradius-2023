import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { gameUseCase } from './gameUseCase';

export type MoveTo = {
  toX: number;
  toY: number;
};

const minmax = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};

export const playerUseCase = {
  move: async (id: UserId, moveTo: MoveTo): Promise<PlayerModel | null> => {
    const player: PlayerModel | null = await playersRepository.getUnique(id);
    if (player === null) return null;

    const movedPlayer: PlayerModel = {
      ...player,
      position: {
        x: minmax(player.position.x + moveTo.toX * player.speed, 0, 1000),
        y: minmax(player.position.y + moveTo.toY * player.speed, 0, 700),
      },
      updateAt: Date.now(),
    };
    await playersRepository.save(movedPlayer);
    return movedPlayer;
  },
  create: async (userId: UserId, userName: string): Promise<PlayerModel | null> => {
    const players: PlayerModel[] = (await playersRepository.getAll()) ?? [];
    const isExist = players.some((player) => player.id === userId);
    if (!isExist) {
      const newPlayer: PlayerModel = {
        id: userId,
        name: userName,
        createdAt: Date.now(),
        updateAt: Date.now(),
        position: {
          x: 150,
          y: 350,
        },
        health: 100,
        score: 0,
        radius: 50,
        speed: 5,
        gameId: await gameUseCase.findGameId(),
      };
      await playersRepository.save(newPlayer);
      return newPlayer;
    }
    return null;
  },
  getStatus: async (id: UserId, name: string): Promise<PlayerModel | null> => {
    await playerUseCase.create(id, name);
    const player: PlayerModel | null = await playersRepository.getUnique(id);
    if (player === null) return null;
    return player;
  },
};
