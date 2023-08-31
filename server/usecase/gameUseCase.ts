import { gameRepository } from '$/repository/gameRepository';

export const gameUseCase = {
  update: async (displayNumber: number) => {
    const game = await gameRepository.find();
    if (game === null) return;

    await gameRepository.save({
      ...game,
      displayNumber,
    });
  },
};
