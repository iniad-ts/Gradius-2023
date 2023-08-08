import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: { position: { x: number; y: number }; key: string };
    resBody: RoomModel;
  };
};
