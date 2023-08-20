//これじゃ動くわけないけどイメージ
// if (game_state === 'playing') {
//   setInterval(() => {
//     make_enemy();
//   }, 2000);

//   setInterval(() => {
//     move_or_delete_enemy();
//   }, 100);
// }
//
//やることリスト
//stateの切り替えに対しての切り替え

setInterval(() => {
  make_enemy();
}, 10000);

setInterval(() => {
  move_or_delete_enemy();
}, 100);

// let timerIdMakeEnemy: number;
// let timerIdMoveOrDeleteEnemy: number;

//仮初期値
const enemy_first_pos_x = 1100;
const enemy_speed = 5;
const enemy_radius = 20;
export const enemies_info: Enemy_Info[] = [];

const make_enemy = () => {
  const new_enemy_info: Enemy_Info = {
    pos: { x: enemy_first_pos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemy_speed,
    radius: enemy_radius,
  };

  enemies_info.push(new_enemy_info);
};

const move_or_delete_enemy = () => {
  let i = 0;
  for (const one_enemy_info of enemies_info) {
    if (one_enemy_info.pos.x - one_enemy_info.speed < 50) {
      enemies_info.splice(i, 1);
      return false;
    }
    one_enemy_info.pos.x = one_enemy_info.pos.x - one_enemy_info.speed;

    i++;
  }
};
