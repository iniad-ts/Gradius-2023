import type { ConfigModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: ConfigModel;
  };
  post: {
    reqBody: ConfigModel;
  };
};
