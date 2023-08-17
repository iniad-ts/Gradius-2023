import { enemyRepository } from '$/Repository/enemyRepository';
import type { EnemyId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';

import { EnemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

//敵の位置を取得する際にこれを使えば、全ての敵の情報が配列で返されます
//repositoryからgetEnemiesを直接たたくとusecaseがなぜか更新されないため1時的な回避策としてusecaseをapiでたたいて認識させてます
export const enemyUsecase = {
  getAll_Enemies: async (): Promise<EnemyModel[]> => {
  getAll_Enemies: async (): Promise<EnemyModel[]> => {
    return await enemyRepository.getEnemies();
  },
  delete_enemy: async (id: EnemyId) => {
  delete_enemy: async (id: EnemyId) => {
    try {
      await enemyRepository.declare(id);
    } catch (e) {
      console.log(e);
    }
  },
};

// 仮初期値
export const enemyInfo = {
  enemy_first_pos_x: 100,
  enemy_speed: 5,
  enemy_radius: 20,
  enemy_hp: 10,
  makeEnemyFrequency: 5000,
  enemySize: { h: 30, w: 30 },
};

setInterval(() => {
  create_enemy();
  deleteOffScEreennemy();
}, 5000);

setInterval(() => {
  // move_or_delete_enemy();
  move_Enemy();
}, 10);

// 仮初期値
const enemy_first_pos_x = 1800;
const enemy_speed = 5;
const enemy_radius = 20;
const enemy_hp = 10;

const create_enemy = async () => {
  const new_enemy: EnemyModel = {
    id: EnemyIdParser.parse(randomUUID()),
    pos: { x: enemyInfo.enemy_first_pos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemyInfo.enemy_speed,
    hp: enemyInfo.enemy_hp,
    radius: enemyInfo.enemy_radius,
    type: 2,
    ///1-3のランダムな数値を返す
    /* type: Math.floor(Math.random() * 3) + 1, */
  };
  await enemyRepository.save(new_enemy);
};
/* const moveToplayer = (enemy: EnemyModel, player: playerModel, delay: number) => {
  enemy.pos.x = (player.pos.x + delay * enemy.pos.x) / (delay + 1);
  enemy.pos.y = (player.pos.y + delay * enemy.pos.y) / (delay + 1);
  return { x: enemy.pos.x - enemy.speed, y: enemy.pos.y };
}; */
//y軸のみプレイヤーに追従する
//delayは追従の遅れを表す
const moveToplayer = (enemy: EnemyModel, player: number[][], delay: number) => {
  enemy.pos.x = enemy.pos.x - enemy.speed;
  enemy.pos.y = (player[0][1] + delay * enemy.pos.y) / (delay + 1);
  return { x: enemy.pos.x, y: enemy.pos.y };
};

//typeによって動きを変える
const moveEnemyByplayer = (enemy: EnemyModel): { x: number; y: number } => {
  if (enemy.type === 1) {
    return { x: enemy.pos.x - enemy.speed, y: enemy.pos.y };
  } else if (enemy.type === 2) {
    moveToplayer(enemy, position, 60);
    /* return { x: enemy.pos.x - 30, y: enemy.pos.y }; */
  } else if (enemy.type === 3) {
    moveToplayer(enemy, position, 30);
    /*  return { x: enemy.pos.x - 100, y: enemy.pos.y }; */
  }
  return { x: enemy.pos.x, y: enemy.pos.y };
};
//敵を動かす
const move_Enemy = async () => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();

  for (const enemy of enemies) {
    const newPos = moveEnemyByplayer(enemy);
    const moved_enemy: EnemyModel = {
      ...enemy,
      //ここは、後でenemyの複雑な動きに対応させる
      pos: { x: enemy.pos.x - 10, y: enemy.pos.y },
    };
    await enemyRepository.save(moved_enemy);
  }
};
//一致する敵が存在するかどうか
const EnemyExist = async (id: EnemyId): Promise<boolean> => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();
  return enemies.some((enemy) => enemy.id === id);
};
//敵を削除する
const deleteEnemy = async (id: EnemyId) => {
  if (await EnemyExist(id)) {
    await enemyRepository.declare(id);
  }
};
//
const deleteOffScEreennemy = async () => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();

  const offScreenEnemiesIds = enemies.filter((enemy) => enemy.pos.x < 50).map((enemy) => enemy.id);

  for (const id of offScreenEnemiesIds) {
    console.log('画面外delete', id);
    await deleteEnemy(id);
  }
};

//await Promise.allは、必要か微妙
//await Promise.all(enemies.map((enemy) => enemyRepository.save(enemy)));
// enemies.map((enemy) => enemyRepository.save(enemy));

//await Promise.allは、必要か微妙
//await Promise.all(enemies.map((enemy) => enemyRepository.save(enemy)));
// enemies.map((enemy) => enemyRepository.save(enemy));
