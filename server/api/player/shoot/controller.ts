import { bulletUsecase } from '$/Usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: ({ body }) => ({ status: 200, body: bulletUsecase.shoot(body) }),
}));
