import { handlerusecase } from '$/usecase/handlerusecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ user }) => ({ status: 201, body: await handlerusecase.create(user.id) }),
}));
