import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body, user }) => ({
    status: 201,
    body: await roomUsecase.create(body.roomName ?? '新しい部屋', body.screen ?? 1, user.id),
  }),
}));
