//やることリスト
import { player_now_position } from './playerUsecase';

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
}, 100);

//玉進める、画面外消去
const move_laser = () => {
  const new_laser_pos: number[][] = [];
  for (const one_laser_pos of laser_pos_list) {
    one_laser_pos[0] + 2 <= 1100 && new_laser_pos.push([one_laser_pos[0] + 2, one_laser_pos[1]]);
  }
  laser_pos_list = new_laser_pos;
  return laser_pos_list;
};
