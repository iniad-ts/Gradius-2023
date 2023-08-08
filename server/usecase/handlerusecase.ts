import type { RoomModel } from '$/commonTypesWithClient/models';

export const handlerusecase = {
  operateXY: async (key: string, position: { x: number; y: number }): Promise<RoomModel> => {
    const Id = '';
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
