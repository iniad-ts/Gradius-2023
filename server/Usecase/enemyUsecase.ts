import { enemyRepository } from '$/Repository/enemyRepository';
import type { EnemyModel } from '$/commonTypesWithClient/models';

import { EnemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

//敵の位置を取得する際にこれを使えば、全ての敵の情報が配列で返されます
//repositoryからgetEnemiesを直接たたくとusecaseがなぜか更新されないため1時的な回避策としてusecaseをapiでたたいて認識させてます
export const enemyUsecase = {
  getAll_Enemies: async (): Promise<EnemyModel[]> => {
    return await enemyRepository.getEnemies();
  },
  deleteEnemy: async (id: EnemyId) => {
    try {
      await enemyRepository.declare(id);
    } catch (e) {
      console.log(e);
    }
  },
};

// 仮初期値
export const enemyInfo = {
  enemyFirstPos_x: 100,
  enemySpeed: 5,
  enemyRadius: 20,
  enemyHp: 10,
  makeEnemyFrequency: 5000,
  enemySize: { h: 30, w: 30 },
};

setInterval(() => {
  create_enemy();
  deleteOffScreenEnemy();
}, enemyInfo.makeEnemyFrequency);

setInterval(() => {
  // move_or_delete_enemy();
  move_Enemy();
  delete_off_screen_enemy();
}, 100);

// 仮初期値
const enemy_first_pos_x = 1800;
const enemy_speed = 5;
const enemy_radius = 20;
const enemy_hp = 10;

const create_enemy = async () => {
  const newEnemy: EnemyModel = {
    id: EnemyIdParser.parse(randomUUID()),
    pos: { x: enemyInfo.enemyFirstPos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemyInfo.enemyHp,
    hp: enemyInfo.enemyHp,
    radius: enemyInfo.enemyRadius,
    type: 2,
    ///1-3のランダムな数値を返す
    /* type: Math.floor(Math.random() * 3) + 1, */
  };
  await enemyRepository.save(new_enemy);
};

//typeによって動きを変える
const moveEnemyByPlayer = (enemy: EnemyModel): { x: number; y: number } => {
  if (enemy.type === 1) {
    return { x: enemy.pos.x - enemy.speed, y: enemy.pos.y };
  } else if (enemy.type === 2) {
    moveToPlayer(enemy, position, 60);
    /* return { x: enemy.pos.x - 30, y: enemy.pos.y }; */
  } else if (enemy.type === 3) {
    moveToPlayer(enemy, position, 30);
    /*  return { x: enemy.pos.x - 100, y: enemy.pos.y }; */
  }
  return { x: enemy.pos.x, y: enemy.pos.y };
};
//敵を動かす
const moveEnemy = async () => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();

  for (const enemy of enemies) {
    const moved_enemy: EnemyModel = {
      ...enemy,
      //ここは、後でenemyの複雑な動きに対応させる
      pos: { x: enemy.pos.x - 10, y: enemy.pos.y },
    };
    await enemyRepository.save(moved_enemy);
  }
};

const delete_off_screen_enemy = async () => {
  let enemies: EnemyModel[] = await enemyRepository.getEnemies();
  enemies = enemies.filter((enemy) => {
    //とりあえず50です
    if (enemy.pos.x < 50) {
      enemyRepository.declare(enemy.id);
      return false;
    } else {
      return true;
    }
  });
  //await Promise.allは、必要か微妙
  //await Promise.all(enemies.map((enemy) => enemyRepository.save(enemy)));
  // enemies.map((enemy) => enemyRepository.save(enemy));
};
