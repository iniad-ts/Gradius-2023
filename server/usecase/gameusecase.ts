import type { RoomModel } from '$/commonTypesWithClient/models';
import { gamerepository } from '$/repository/gamerepositry';
import assert from 'assert';

const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const gameUsecase = {
  // eslint-disable-next-line complexity
  create: async (userId: string) => {
    const newRoom: RoomModel = {
      Id: userId,
      x: 4,
      y: 0,
      board: initBoard(),
    };
    await gamerepository.save(newRoom);
    console.log('newgame');
    return newRoom;
  },
  playerMove: async (
    x: number,
    y: number,
    key: string,
    board: number[][],
    userId: string
  ): Promise<RoomModel> => {
    const label = userId;
    console.log(label);
    const latest = await gamerepository.findLatest(label);
    assert(latest, 'クリック出来てるんだからRoomが無いわけがない');
    console.log(latest);
    board[x][y] = 0;
    if (key === 'ArrowUp') {
      x -= 1;
      latest.x = x;
    } else if (key === 'ArrowDown') {
      x += 1;
      latest.x = x;
    } else if (key === 'ArrowLeft') {
      y -= 1;
      latest.y = y;
    } else if (key === 'ArrowRight') {
      y += 1;
      latest.y = y;
    }
    board[x][y] = 1;
    console.log(userId);
    await gamerepository.save(latest);
    return latest;
  },
};
