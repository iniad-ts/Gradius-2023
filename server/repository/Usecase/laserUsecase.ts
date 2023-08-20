import { enemy_list } from './enemyUsecase';
import { player_info } from './playerUsecase';

export type Laser_Info = {
  pos: { x: number; y: number };
  speed: number;
  // direction: number;
  radius: number;
  // kind: number;
  // userid: UserId;
};

export const laseies_info: Laser_Info[] = [];

//コードのレファクタリング
export let laser_pos_list: number[][] = [[]];

// 発射した玉の位置を玉位置リストに追加
// player基準の初期玉位置は、調整がおそらく必要
export const make_laser = {
  shot_laser: async () => {
    laser_pos_list.push([player_now_position[0], player_now_position[1] - 10]);
  },
};

//玉位置更新/0.1
//敵の移動の関数に入れても良いかも
setInterval(() => {
  move_laser();
  check_contact();
}, 10);

// if (game_state === 'wait_start' && intervalId === null) {
//   intervalId = setInterval(() => {
//     move_laser();
//     check_contact();
//   }, 10);
// }

// if (game_state !== 'wait_start' && intervalId !== null) {
//   clearInterval(intervalId);
//   intervalId = null;
// }

//画面外消去処理も含む
//フロント移植予定
const move_laser = () => {
  let i = 0;
  for (const one_laser_info of laseies_info) {
    one_laser_info.pos.x = one_laser_info.pos.x + 10;
    one_laser_info.pos.x + 2 >= 1100 && laseies_info.splice(i, 1);
    i++;
  }
};

//mapで書き直す
//フロント移植予定
const check_contact = () => {
  let i = 0;
  for (const one_laser_info of laseies_info) {
    let h = 0;
    for (const one_enemy_pos of enemy_list) {
      if (
        Math.sqrt(
          Math.pow(one_laser_info.pos.x - one_enemy_pos[0], 2) +
            Math.pow(one_laser_info.pos.y - one_enemy_pos[1], 2)
        ) <=
        one_laser_info.radius + 20
      ) {
        laseies_info.splice(i, 1);
        enemy_list.splice(h, 1);
      }
      h++;
    }
    i++;
  }
  laser_pos_list = new_laser_pos;
  return laser_pos_list;
};
