import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: number | null;
  };
  post: {
    reqBody: {
      displayNumber: number;
    };
  };
}>;
