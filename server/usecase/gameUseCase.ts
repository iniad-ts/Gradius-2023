import { gameRepository } from '$/repository/gameRepository';

export const gameUseCase = {
  get: async () => {
    const game = await gameRepository.find();
    return game?.displayNumber ?? null;
  },

  update: async (displayNumber: number) => {
    const game = await gameRepository.find();
    if (game === null) return;

    await gameRepository.save({
      ...game,
      displayNumber,
    });
  },
};
