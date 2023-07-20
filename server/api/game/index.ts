import type { RoomModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: { x: number; y: number; key: string; board: number[][] };
    resBody: RoomModel;
  };
};
