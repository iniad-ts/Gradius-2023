import { tasksRepository } from '$/repository/tasksRepository';
import { defineController } from './$relay';
export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: ({ body }) => ({
    status: 200,
    body: tasksRepository.getInputKey(body.key),
  }),
}));
