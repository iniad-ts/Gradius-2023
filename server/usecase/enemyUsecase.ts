import type { EnemyModel } from '$/commonTypesWithClient/models';

export let enemies_info: EnemyModel[] = [];

//仮初期値
const enemy_first_pos_x = 1800;
const enemy_speed = 5;
const enemy_radius = 20;
const enemy_score = 5;
const enemy_hp = 10;
const enemy_kinds = 'nomal';

const make_enemy = () => {
  const new_enemy_info: EnemyModel = {
    pos: { x: enemy_first_pos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemy_speed,
    radius: enemy_radius,
    score: enemy_score,
    hp: enemy_hp,
    kinds: enemy_kinds,
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
