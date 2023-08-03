import type { RoomModel } from '$/commonTypesWithClient/models';
import { gamerepository } from '$/repository/gamerepositry';
import assert from 'assert';

// const initBoard = () => [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

export const gameUsecase = {
  create: async (userId: string) => {
    const newRoom: RoomModel = {
      Id: userId,
      // x: 0,
      // y: 200,
      position: { x: 0, y: 200 },
      // board: initBoard(),
    };
    await gamerepository.save(newRoom);
    console.log('newgame');
    return newRoom;
  },
  playerMove: async (
    // x: number,
    // y: number,
    key: string,
    // board: number[][],
    position: { x: number; y: number },
    userId: string
  ): Promise<RoomModel> => {
    const label = userId;
    console.log(label);
    const latest = await gamerepository.findLatest(label);
    assert(latest, 'クリック出来てるんだからRoomが無いわけがない');
    console.log(latest);
    // board[x][y] = 0;
    if (key === 'ArrowUp') {
      position.y -= 5;
      latest.position.y = position.y;
    } else if (key === 'ArrowDown') {
      position.y += 5;
      latest.position.y = position.y;
    } else if (key === 'ArrowLeft') {
      position.x -= 5;
      latest.position.x = position.x;
    } else if (key === 'ArrowRight') {
      position.x += 5;
      latest.position.x = position.x;
    }
    // board[x][y] = 1;
    console.log(userId);
    await gamerepository.save(latest);
    return latest;
  },
};
