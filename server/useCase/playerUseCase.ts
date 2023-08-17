import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
import { gamesRepository } from '$/repository/gamesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { gameOver } from '$/service/gameOver';
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
    const displayNumber = (await gamesRepository.find())?.displayNumber;
    if (player === null || displayNumber === undefined) return null;
    const movedPlayer: PlayerModel = {
      ...player,
      position: {
        x: minmax(player.position.x + moveTo.toX * 5, 0, 1920 + 1920 * displayNumber),
        y: minmax(player.position.y + moveTo.toY * 5, 0, 1080),
      },
    };
    await playersRepository.save(movedPlayer);
    return movedPlayer;
  },
  hit: async (player: PlayerModel, bulletId: string, displayNumber: number) => {
    const newPlayer = {
      ...player,
      health: player.health - 1,
      position: { ...player.position, x: player.position.x + 1920 * displayNumber },
    };
    await gameOver(player, newPlayer);
    await bulletsRepository.delete(bulletId);
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
  findInDisplay: async (displayNumber: number): Promise<PlayerModel[]> => {
    const res = await playersRepository.findAll();
    const playerInDisplay: PlayerModel[] = res
      .filter((player) => isInDisplay(displayNumber, player.position.x))
      .map((player) => ({
        ...player,
        position: { ...player.position, x: player.position.x - 1920 * displayNumber },
      }));
    return playerInDisplay;
  },
};
