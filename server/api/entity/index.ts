import type { EntitiesResponse } from '$../../commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: {
      displayNumber: number;
    };
    resBody: EntitiesResponse;
  };
}>;
