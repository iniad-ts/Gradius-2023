import type { UserId } from '$/commonTypesWithClient/branded';
import type { GameSessionModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: GameSessionModel | null;
  };
  post: {
    reqBody: {
      playerId: UserId;
      stageId: string;
    };
    resBody: GameSessionModel;
  };
};
