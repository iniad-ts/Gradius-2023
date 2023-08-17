import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: RoomModel[] | null;
  };
  post: {
    reqBody: RoomModel;
    resBody: void;
  };
};
