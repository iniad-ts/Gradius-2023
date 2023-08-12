import { playerRepository } from '$/Repository/playerRepository';
import type { playerModel } from '$/commonTypesWithClient/models';
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
    s[0] + 1 <= 1500 && newGunPosition.push([s[0] + 1, s[1]]);
  }
  gunPosition = newGunPosition;
  return gunPosition;
};

export const playerUsecase = (() => {
  return {
    movePlayer: async (movedirection: MoveDirection) => {
      position[0][0] += movedirection.x * 10;
      position[0][1] += movedirection.y * 10;
    },

    getPlayerPos: async () => {
      return position;
    },
  };
})();

//kkkk
export const player_Usecase = {
  getAll_Player: async (): Promise<playerModel[]> => {
    return await playerRepository.getPlayers();
  },
};

// 仮初期値
const player_first_pos_x = 300;
const player_first_pos_y = 300;
const player_speed = 5;
const player_radius = 20;
const player_hp = 10;
const player_score = 0;

const create_player = async () => {
  const new_player: playerModel = {
    userId: UserIdParser.parse(randomUUID()),
    pos: { x: player_first_pos_x, y: player_first_pos_y },
    speed: player_speed,
    hp: player_hp,
    radius: player_radius,
    score: player_score,
  };
  await playerRepository.save(new_player);
};
//残りのやることplayerを動かせるように
