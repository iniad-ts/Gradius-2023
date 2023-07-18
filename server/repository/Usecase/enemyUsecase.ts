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

// if (game_state === 'playing') {
//   timerIdMakeEnemy = window.setInterval(() => {
//     if (game_state !== 'playing') {
//       window.clearInterval(timerIdMakeEnemy);
//     } else {
//       make_enemy();
//     }
//   }, 10000);

//   timerIdMoveOrDeleteEnemy = window.setInterval(() => {
//     if (game_state !== 'playing') {
//       window.clearInterval(timerIdMoveOrDeleteEnemy);
//     } else {
//       move_or_delete_enemy();
//     }
//   }, 100);
// }

export let enemy_list: number[][] = [];
export type Enemy_Info = {
  pos: { x: number; y: number };
  speed: number;
  // kind: number;
  radius: number;
  // hp: number;
  //scole:number;
};
export const enemy_info: Enemy_Info[] = [];

const make_enemy = () => {
  const enemy_pos_y: number = Math.floor(Math.random() * 690) + 1;
  enemy_list.push([1110, enemy_pos_y]);
};

const move_or_delete_enemy = () => {
  const new_enemy_list = enemy_list.map((one_enemy) => {
    one_enemy[0] -= 5;
    return one_enemy;
  });
  enemy_list = new_enemy_list.filter((one_enemy) => one_enemy[0] >= 50);
};
