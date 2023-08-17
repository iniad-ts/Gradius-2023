import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { UserIdParser } from '$/service/idParsers';
import { minmax } from '$/service/minmax';
import { randomUUID } from 'crypto';

export type MoveTo = {
  toX: number;
  toY: number;
};

const minmax = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};
export const playerUseCase = {
  move: async (name: string, moveTo: MoveTo): Promise<PlayerModel | null> => {
    const player: PlayerModel | null = await playersRepository.find(name);
    if (player === null) return null;
    const movedPlayer: PlayerModel = {
      ...player,
      position: {
        x: minmax(player.position.x + moveTo.toX * 5, 0, 1920),
        y: minmax(player.position.y + moveTo.toY * 5, 0, 1080),
      },
    };
    await playersRepository.save(movedPlayer);
    return movedPlayer;
  },
  create: async (userName: string): Promise<PlayerModel | null> => {
    const newPlayer: PlayerModel = {
      id: UserIdParser.parse(randomUUID()),
      name: userName,
      position: {
        x: 150,
        y: 350,
      },
      createdAt: Date.now(),
      health: 100,
      score: 0,
      team: 'red',
    };
    console.log('create');
    await playersRepository.save(newPlayer);
    return newPlayer;
  },
  getStatus: async (id: UserId, name: string): Promise<PlayerModel | null> => {
    await playerUseCase.create(name);
    const player: PlayerModel | null = await playersRepository.find(id);
    if (player === null) return null;
    return player;
  },
};
