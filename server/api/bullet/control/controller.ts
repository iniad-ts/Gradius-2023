import { bulletUsecase } from '$/usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await bulletUsecase.update() }),
}));
