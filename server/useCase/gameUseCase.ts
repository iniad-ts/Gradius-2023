<<<<<<< HEAD
=======
import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { gamesRepository } from '$/repository/gamesRepository';
import { playersRepository } from '$/repository/playersRepository';
import { gameOver } from '$/service/gameOver';
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
      await enemyUseCase.createAll(displayNumber);
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
    enemyUseCase.shot2();
    enemyUseCase.shot3();
    // enemyUseCase.shot4();
    if (id === null) return null;
    const player = await playersRepository.find(id);
    if (player === null) return null;
    return player;
  },
  collision: async (player: PlayerModel, enemy: EnemyModel, displayNumber: number) => {
    const newPlayer = {
      ...player,
      health: player.health - 1,
      position: { ...player.position, x: player.position.x + 1920 * displayNumber },
    };

    const enemyStatus = await enemiesRepository.find(enemy.id);
    if (enemyStatus?.deletedAt !== null) {
      return;
    }
    await gameOver(player, newPlayer);
    await enemiesRepository.update(enemy.id, new Date());
  },
};
>>>>>>> 03663785872daa6745ed7d079ca26d8a5e223177
