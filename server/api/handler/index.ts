import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: { key: string; position: { x: number; y: number } };
    resBody: RoomModel;
  };
};
