import { bulletUseCase } from '$/usecase/bulletUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: bulletUseCase.getAll() }),
  post: async ({ user }) => ({ status: 200, body: await bulletUseCase.shoot(user.id) }),
}));
