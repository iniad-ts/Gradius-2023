import type { GameSessionModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: GameSessionModel | null;
  };
  post: {
    reqBody: {
      playerId: string;
      stageId: string;
    };
    resBody: GameSessionModel;
  };
};
