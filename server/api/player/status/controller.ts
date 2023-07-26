import { playerUseCase } from '$/usecase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await playerUseCase.getStatus(user.id, user.displayName ?? 'No Name'),
  }),
}));
