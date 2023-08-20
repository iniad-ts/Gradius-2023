import { gunPosition } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: gunPosition }),
}));
