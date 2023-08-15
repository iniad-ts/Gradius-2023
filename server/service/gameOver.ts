import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';

export const gameOver = async (player: PlayerModel, newPlayer: PlayerModel): Promise<void> => {
  if (player.health <= 0) {
    const newScore = player.score - 5 >= 0 ? player.score - 5 : 0; // 仮でスコアが0以下にならないように
    playersRepository.save({ ...newPlayer, health: 0, score: newScore });
  } else {
    playersRepository.save({ ...newPlayer, health: player.health - 1 });
  }
};
