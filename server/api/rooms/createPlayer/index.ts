import type { UserId } from '$/commonTypesWithClient/branded';

export type Methods = {
  get: {
    resBody: { userId: UserId };
  };
};
