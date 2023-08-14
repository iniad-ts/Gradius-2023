import type { UserId } from '$/commonTypesWithClient/branded';

export type Methods = {
  post: {
    reqBody: { username: string };
    resBody: { userId: UserId };
  };
};
