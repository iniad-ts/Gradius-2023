import type { RoomModel } from '$/commonTypesWithClient/models';
export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    // roomNameとscreen
    reqBody: Partial<RoomModel>;
    resBody: RoomModel;
  };
};
