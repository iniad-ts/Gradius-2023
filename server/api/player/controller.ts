import { controlUseCase } from '$/usecase/controlUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: controlUseCase.getPosition }),
  post: ({ body }) => ({ status: 200, body: controlUseCase.move(body) }),
}));
