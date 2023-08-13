import { playerRepository } from '$/Repository/playerRepository';
import type { PlayerModel } from '$/commonTypesWithClient/models';

import { UserIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export type MoveDirection = { x: number; y: number };

export const position: number[][] = [[300, 500]];
export let gunPosition: number[][] = [[]];

export const gunShot = async () => {
  console.log('gunShot動作');
  gunPosition.push([position[0][0] + 10, position[0][1]]);
};
setInterval(() => {
  moveGun();
}, 5);

const moveGun = () => {
  const newGunPosition: number[][] = [];
  for (const s of gunPosition) {
    //TODO この5000は仮の値、将来的にはモニターサイズから逆算して出す
    s[0] + 1 <= 5000 && newGunPosition.push([s[0] + 1, s[1]]);
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
  createNewPlayer: async () => {
    //playerの初期ステータス
    const new_player: PlayerModel = {
      userId: UserIdParser.parse(randomUUID()),
      pos: { x: 50, y: 300 },
      speed: 5,
      hp: 10,
      radius: 20,
      score: 0,
    };
    await playerRepository.save(new_player);
    return new_player.userId;
  },
  movePlayer: async (movedirection: MoveDirection, user_Id: string) => {
    // position[0][0] += movedirection.x * 10;
    // position[0][1] += movedirection.y * 10;
    const recentlyPlayerInfo = await playerRepository.read(user_Id);
    const updatePlayerInfo: PlayerModel = {
      userId: recentlyPlayerInfo.userId,
      pos: {
        x: (recentlyPlayerInfo.pos.x += movedirection.x * 10),
        y: (recentlyPlayerInfo.pos.y += movedirection.y * 10),
      },
      speed: recentlyPlayerInfo.speed,
      hp: recentlyPlayerInfo.hp,
      radius: recentlyPlayerInfo.radius,
      score: recentlyPlayerInfo.score,
    };
    await playerRepository.save(updatePlayerInfo);
  },

  getAllPlayer: async (): Promise<PlayerModel[]> => {
    return await playerRepository.getPlayers();
  },
  create_player: async () => {
    const newPlayer: PlayerModel = {
      userId: UserIdParser.parse(randomUUID()),
      pos: { x: playerInfo.playerFirstPos_x, y: playerInfo.playerFirstPos_y },
      speed: playerInfo.playerSpeed,
      hp: playerInfo.playerHp,
      radius: playerInfo.playerRadius,
      score: playerInfo.playerScore,
    };
    await playerRepository.save(newPlayer);
  },

  //残りのやることplayerを動かせるように
  getPlayerPos: async () => {
    return await playerRepository.getPlayers();
  },
  getUserId: async () => {
    return await playerUsecase.createNewPlayer();
  },

  //スコアとかどうしよう。
};
