import { playerRepository } from '$/Repository/playerRepository';
import type { PlayerModel } from '$/commonTypesWithClient/models';

import { UserIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import type { UserId } from './../commonTypesWithClient/branded';

export type MoveDirection = { x: number; y: number };

export const position: number[][] = [[300, 500]];
export let gunPosition: number[][] = [[]];

export const gunShot = async (userId: UserId) => {
  console.log('gunShot動作');
  const recentlyPlayerInfo = await playerRepository.read(userId);
  gunPosition.push([recentlyPlayerInfo.pos.x, recentlyPlayerInfo.pos.y]);
};

setInterval(() => {
  moveGun();
}, 5);

const moveGun = () => {
  const newGunPosition: number[][] = [];
  for (const s of gunPosition) {
    //TODO この5000は仮の値、将来的にはモニターサイズから逆算して出す
    s[0] + 1 <= 15000 && newGunPosition.push([s[0] + 1, s[1]]);
  }
  gunPosition = newGunPosition;
  return gunPosition;
};

// 仮初期値
export const playerInfo = {
  playerFirstPos_x: 300,
  playerFirstPos_y: 300,
  playerSpeed: 5,
  playerRadius: 20,
  playerHp: 10,
  playerScore: 0,
  playerSize: { h: 30, w: 40 },
};

export const playerUsecase = {
  createNewPlayer: async (name: string) => {
    //playerの初期ステータス
    const new_player: PlayerModel = {
      userId: UserIdParser.parse(randomUUID()),
      pos: { x: 50, y: 300 },
      speed: 5,
      hp: 10,
      radius: 20,
      score: 0,
      name,
    };
    await playerRepository.save(new_player);
    return new_player.userId;
  },
  movePlayer: async (movedirection: MoveDirection, userid: UserId) => {
    // position[0][0] += movedirection.x * 10;
    // position[0][1] += movedirection.y * 10;
    const recentlyPlayerInfo = await playerRepository.read(userid);
    const updatePlayerInfo: PlayerModel = {
      ...recentlyPlayerInfo,
      pos: {
        x: recentlyPlayerInfo.pos.x + movedirection.x * recentlyPlayerInfo.speed,
        y: recentlyPlayerInfo.pos.y + movedirection.y * recentlyPlayerInfo.speed,
      },
    };
    await playerRepository.save(updatePlayerInfo);
  },

  getAllPlayer: async (): Promise<PlayerModel[]> => {
    return await playerRepository.getPlayers();
  },
  getPlayerPos: async () => {
    return await playerRepository.getPlayers();
  },

  //スコアとかどうしよう。
};
