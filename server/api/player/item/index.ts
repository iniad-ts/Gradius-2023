import type { DefineMethods } from 'aspida';
import type { UserId } from './../../../commonTypesWithClient/branded';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      userId: UserId;
      itemId: string;
    };
    resBody: void | null;
  };
}>;
