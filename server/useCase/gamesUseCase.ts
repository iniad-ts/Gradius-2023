import type { GameId } from '$/commonTypesWithClient/branded';
import { gamesRepository } from '$/repository/gamesRepository';

export const gameUseCase = {
  add: async (gameId: GameId, displayNumber: number, displayIpAddress: string) => {
    const currentGame = await gamesRepository.find(gameId);
    if (currentGame !== null) {
      const changeGame = {
        ...currentGame,
        displays: [...currentGame.displays].splice(displayNumber, 0, displayIpAddress),
      };
      await gamesRepository.save(changeGame);
    }
  },
  remove: async (gameId: GameId, displayIpAddress: string) => {
    const currentGame = await gamesRepository.find(gameId);
    if (currentGame !== null) {
      const changeGame = {
        ...currentGame,
        displays: [...currentGame.displays].splice(
          currentGame.displays.indexOf(displayIpAddress),
          1
        ),
      };
      await gamesRepository.save(changeGame);
    }
  },
  view: async (gameId: GameId, displayIpAddress: string) => {
    const game = await gamesRepository.find(gameId);
    return game?.displays.indexOf(displayIpAddress);
  },
};
