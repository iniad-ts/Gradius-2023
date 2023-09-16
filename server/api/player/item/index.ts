import type { UserId } from '$/commonTypesWithClient/branded';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      userId: UserId;
      itemId: string;
    };
    resBody: void | null;
  };
}>;
