import type { Item } from '$../../../commonConstantsWithClient/item';
import type { DefineMethods } from 'aspida';
import type { UserId } from './../../../commonTypesWithClient/branded';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      userId: UserId;
      items: Item[];
    };
    resBody: void | null;
  };
}>;
