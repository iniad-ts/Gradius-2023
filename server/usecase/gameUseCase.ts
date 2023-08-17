import type { GameModel } from '$/commonTypesWithClient/models';
import { gameRepository } from '$/repository/gameRepository';
export const gameUseCase = {
  findGameId: async () => {
    const game: GameModel | null = await gameRepository.get();
    if (game !== null) return game.id;
    return (await gameRepository.create()).id;
  },
};
