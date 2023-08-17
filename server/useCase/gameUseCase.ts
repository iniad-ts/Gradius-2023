import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { gamesRepository } from '$/repository/gamesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { gameIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import { bulletUseCase } from './bulletUseCase';
import { enemyUseCase } from './enemyUseCase';

export const gameUseCase = {
  config: {
    get: async () => {
      const game = await gamesRepository.find();
      if (game !== null) {
        return game;
      }
      return await gamesRepository.save({
        id: gameIdParser.parse(randomUUID()),
        displayNumber: 0,
        createdAt: Date.now(),
      });
    },
    setup: async (displayNumber: number) => {
      const game = await gamesRepository.find();
      if (game === null) {
        return;
      }
      await gamesRepository.save({
        ...game,
        displayNumber,
      });
    },
  },
  update: async (id: UserId) => {
    bulletUseCase.delete();
    enemyUseCase.respawn();
    if (id === null) return null;
    const player = await playersRepository.find(id);
    if (player === null) return null;
    return player;
  },
  collision: async (player: PlayerModel, enemy: EnemyModel) => {
    const newPlayer = { ...player, health: player.health - 1 };
    await playersRepository.save(newPlayer);
    await enemiesRepository.update(enemy.id, new Date());
  },
};
