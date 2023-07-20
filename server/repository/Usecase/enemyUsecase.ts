//やることリスト
//stateの切り替えに対しての切り替え

export type Enemy_Info = {
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
export let enemies_info: Enemy_Info[] = [];

const make_enemy = () => {
  const new_enemy_info: Enemy_Info = {
    pos: { x: enemy_first_pos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemy_speed,
    radius: enemy_radius,
  };
  enemies_info.push(new_enemy_info);
};

const move_or_delete_enemy = () => {
  enemies_info = enemies_info.filter((one_enemy_info) => {
    if (one_enemy_info.pos.x - one_enemy_info.speed < 50) {
      return false;
    }
    one_enemy_info.pos.x = one_enemy_info.pos.x - one_enemy_info.speed;
    return true;
  });
};

setInterval(() => {
  make_enemy();
}, 10000);

setInterval(() => {
  move_or_delete_enemy();
}, 100);
