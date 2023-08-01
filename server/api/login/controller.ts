import { playerUseCase } from '$/usecase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello, world' }),
  post: async ({ body }) => {
    const newPlayer = await playerUseCase.create(body.userName);
    if (newPlayer === null) {
      return { status: 400 };
    }
    return {
      status: 200,
      body: { name: newPlayer.name },
    };
  },
}));
