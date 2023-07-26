import { stageRepository } from '$/repository/stageRepository';
import { stageIdParser } from '$/service/idParsers';

export const stageUsecase = {
  createForDebug: async () => {
    const stage = await stageRepository.save({
      id: stageIdParser.parse('debug'),
      name: 'debug',
      difficultyLevel: 1,
    });
    return stage;
  },
};
