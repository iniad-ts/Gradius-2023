import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { userIdParser } from '$/service/idParsers';
import { isInDisplay } from '$/service/isInDisplay';
import { minmax } from '$/service/minmax';
import { randomUUID } from 'crypto';

export type MoveTo = {
  toX: number;
  toY: number;
};

export const playerUseCase = {
  move: async (id: UserId, moveTo: MoveTo): Promise<PlayerModel | null> => {
    const player: PlayerModel | null = await playersRepository.find(id);

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
      id: userIdParser.parse(randomUUID()),
      name: userName,
      position: {
        x: 150,
        y: 350,
      },
      createdAt: Date.now(),
      health: 5,
      score: 0,
      team: 'red',
    };
    await playersRepository.save(newPlayer);
    return newPlayer;
  },
  findAll: async (displayNumber: number) => {
    const res = (await playersRepository.findAll()) ?? [];
    const playerInDisplay = res.filter((player) => isInDisplay(displayNumber, player.position.x));
    return playerInDisplay;
  },
  getStatus: async (id: UserId): Promise<PlayerModel | null> => {
    if (id === null) return null;
    const player: PlayerModel | null = await playersRepository.find(id);
    if (player === null) return null;
    return player;
  },
  update: async (player: PlayerModel): Promise<PlayerModel | null> => {
    await playersRepository.save(player);
    return player;
  },
};
