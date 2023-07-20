import { enemies_info } from './enemyUsecase';
import { player_info } from './playerUsecase';
export type Laser_Info = {
  pos: { x: number; y: number };
  speed: number;
  // direction: number;
  radius: number;
  // kind: number;
  // userid: UserId;
};
export let laseies_info: Laser_Info[] = [];

//仮初期値
const laser_speed = 10;
const laser_radious = 10;

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
  move_or_delete_laser();
  check_contact();
}, 10);

//フロント移植予定
const move_or_delete_laser = () => {
  laseies_info = laseies_info.filter((one_laser_info) => {
    one_laser_info.pos.x = one_laser_info.pos.x + 10;
    if (one_laser_info.pos.x + 2 >= 1100) {
      return false;
    }
    return true;
  });
};

//mapで書き直す
//フロント移植予定
const check_contact = () => {
  let i = 0;
  for (const one_laser_info of laseies_info) {
    let h = 0;
    for (const one_enemy_info of enemies_info) {
      if (
        Math.sqrt(
          Math.pow(one_laser_info.pos.x - one_enemy_info.pos.x, 2) +
            Math.pow(one_laser_info.pos.y - one_enemy_info.pos.y, 2)
        ) <=
        one_laser_info.radius + one_enemy_info.radius
      ) {
        laseies_info.splice(i, 1);
        enemies_info.splice(h, 1);
      }
      h++;
    }
    i++;
  }
};
