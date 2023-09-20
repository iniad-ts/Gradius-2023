import { SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { EnemyModel, EnemyModelWithPos, MoveModel } from '$/commonTypesWithClient/models';
import { loop } from './type2Moves/loop';
import { zigzagMove } from './type2Moves/zigzag';

const ENEMY_MOVE_SPEED = 500;

const movesList: MoveModel[] = [zigzagMove, loop];

export const type2EnemyMove = (enemy: EnemyModel): EnemyModelWithPos => {
  const displayNum = Math.floor(enemy.createdPos.x / SCREEN_WIDTH);

  if (displayNum >= movesList.length) return { ...enemy, pos: { x: 0, y: 0 } };
  const { moves, MOVE_LOOP_DURATION_MS, TIME_TABLE, STEP_DURATION_MS } =
    movesList[displayNum](ENEMY_MOVE_SPEED);

  const time = (Date.now() - enemy.createdAt) % MOVE_LOOP_DURATION_MS;
  const moveType = TIME_TABLE[Math.floor(time / STEP_DURATION_MS)];

  const move = moves[moveType];

  const newX = enemy.createdPos.x + move(time / 1000).x;
  const newY = enemy.createdPos.y + move(time / 1000).y;

  // console.log(newX, newY);
  return { ...enemy, pos: { x: newX, y: newY } };
};
