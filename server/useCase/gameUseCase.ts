import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { bulletsRepository } from '$/repository/bulletsRepository';
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
    bulletUseCase.deleteInOutside();
    enemyUseCase.respawn();
    const res = await bulletsRepository.findLatest();
    if (res.createdAt + 1000 < new Date().getTime()) {
      enemyUseCase.shot.tracking();
      enemyUseCase.shot.trackingAndSpread();
    }
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
