import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    resBody: RoomModel;
  };
};
