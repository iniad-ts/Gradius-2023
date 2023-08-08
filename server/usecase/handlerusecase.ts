import type { RoomModel } from '$/commonTypesWithClient/models';
// import {handlerrepository} from "$/repository/handlerrepository";
// import assert from 'assert';

export const handlerusecase = {
  create: async (userId: string) => {
    const newRoom: RoomModel = {
      Id: userId,
      position: { x: 0, y: 0 },
    };
    // await handlerrepository.save(newRoom);
    // console.log("newgame");
    return newRoom;
  },
  operateXY: async (
    key: string,
    position: { x: number; y: number },
    userId: string
  ): Promise<RoomModel> => {
    const Id = userId;
    if (key === 'ArrowUp') {
      position.y -= 1;
    } else if (key === 'ArrowDown') {
      position.y += 1;
    } else if (key === 'ArrowLeft') {
      position.x -= 1;
    } else if (key === 'ArrowRight') {
      position.x += 1;
    }
    return { Id, position };
  },
};
