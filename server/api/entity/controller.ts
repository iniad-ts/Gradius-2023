import { entityUseCase } from '$/usecase/entityUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => {
    const { displayNumber } = query;
    const entities = await entityUseCase.getEntitiesByDisplayNumber(displayNumber);
    return { status: 200, body: entities };
  },
}));
