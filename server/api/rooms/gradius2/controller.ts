import { gun } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: gun }),
}));
