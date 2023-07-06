import { createTask1 } from '$/repository/gamerepositry';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({ status: 201, body: await createTask1(body.label) }),
}));
