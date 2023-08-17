import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { userIdParser } from '$/service/idParsers';
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
      health: 100,
      score: 0,
      team: 'red',
    };
    await playersRepository.save(newPlayer);
    return newPlayer;
  },
<<<<<<< HEAD
  getStatus: async (id: UserId): Promise<PlayerModel | null> => {
    if (id === null) return null;
=======
  getStatus: async (id: UserId, name: string | null): Promise<PlayerModel | null> => {
    if (name !== null) {
      await playerUseCase.create(name);
    }
>>>>>>> parent of ed0da40 (Merge branch 'main' of github.com:INIAD-Developers/Gradius-2023-B)
    const player: PlayerModel | null = await playersRepository.find(id);
    if (player === null) return null;
    return player;
  },
  update: async (player: PlayerModel): Promise<PlayerModel | null> => {
    await playersRepository.save(player);
    return player;
  },
};
