import type { UserId } from '$/commonTypesWithClient/branded';

export type Methods = {
  get: {
    resBody: number[][];
  };
  post: {
    reqBody: UserId;
    resBody: number[][];
  };
};
