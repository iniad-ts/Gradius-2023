//やることリスト
import { enemy_list } from './enemyUsecase';
import { player_now_position } from './playerUsecase';

//コードのレファクタリング
export let laser_pos_list: number[][] = [];

//そのうち、弾の種類によって情報を変更できるようにしたい
export const add_new_laser = {
  shot_laser: () => {
    const new_laser: Laser_Info = {
      pos: { x: player_info.pos.x, y: player_info.pos.y - 10 },
      speed: laser_speed,
      radius: laser_radious,
    };
    laseies_info.push(new_laser);
  },
};

//敵の移動の関数に入れても良いかも

setInterval(() => {
  move_laser();
  check_contact();
}, 10);

//玉進める、画面外消去
const move_laser = () => {
  const new_laser_pos: number[][] = [];
  for (const one_laser_pos of laser_pos_list) {
    one_laser_pos[0] + 2 <= 1100 && new_laser_pos.push([one_laser_pos[0] + 10, one_laser_pos[1]]);
  }
  laser_pos_list = new_laser_pos;
  return laser_pos_list;
};

//当たり判定
const check_contact = () => {
  let i = 0;
  for (const one_laser_pos of laser_pos_list) {
    let h = 0;
    for (const one_enemy_pos of enemy_list) {
      if (
        Math.sqrt(
          Math.pow(one_laser_pos[0] - one_enemy_pos[0], 2) +
            Math.pow(one_laser_pos[1] - one_enemy_pos[1], 2)
        ) <= 29
      ) {
        laser_pos_list.splice(i, 1);
        enemy_list.splice(h, 1);
      }
      h++;
    }
    i++;
  }
};
