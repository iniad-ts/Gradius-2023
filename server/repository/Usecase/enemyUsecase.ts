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

export type Enemies_Info = {
  pos: { x: number; y: number };
  speed: number;
  // kind: number;
  radius: number;
  // hp: number;
  //scole:number;
};
//仮初期値
const enemy_first_pos_x = 1100;
const enemy_speed = 5;
const enemy_radius = 20;
export const enemies_info: Enemies_Info[] = [];

const make_enemy = () => {
  const new_enemy_info: Enemies_Info = {
    pos: { x: enemy_first_pos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemy_speed,
    radius: enemy_radius,
  };

  enemies_info.push(new_enemy_info);
};

const move_or_delete_enemy = () => {
  const i = 0;
  for (const one_enemy_info of enemies_info) {
    one_enemy_info.pos.x - one_enemy_info.speed < 50 && enemies_info.splice(i, 1);
  }
};
