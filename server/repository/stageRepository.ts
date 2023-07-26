import type { StageModel } from '$/commonTypesWithClient/models';
import { stageIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Stage } from '@prisma/client';
import { z } from 'zod';

const toStageModel = (stage: Stage) => ({
  id: stageIdParser.parse(stage.id),
  name: z.string().parse(stage.name),
  difficultyLevel: z.number().parse(stage.difficultyLevel),
});

export const stageRepository = {
  save: async (stage: StageModel) => {
    const savedStage = await prismaClient.stage.upsert({
      where: { id: stage.id },
      update: {
        name: stage.name,
        difficultyLevel: stage.difficultyLevel,
      },
      create: {
        id: stage.id,
        name: stage.name,
        difficultyLevel: stage.difficultyLevel,
      },
    });
    return savedStage && toStageModel(savedStage);
  },
};
