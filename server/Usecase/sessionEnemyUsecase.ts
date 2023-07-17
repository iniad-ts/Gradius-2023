import type {
  EnemyId,
  GameSessionId,
  PlayerId,
  SessionsEnemiesId,
} from '$/commonTypesWithClient/branded';
import type { SessionsEnemiesModel } from '$/commonTypesWithClient/models';
import { sessionEnemyRepository } from '$/repository/SessionEnemyRepository';
import { enemyRepository } from '$/repository/enemyRepository';
import { enemyIdParser, sessionsEnemiesIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';
import { gameSessionUsecase } from './gameSessionUsecase';

export const sessionEnemyUsecase = {
  getEnemy: async (session: GameSessionId) => {
    const enemyList = await sessionEnemyRepository.findBySessionId(session);
    return enemyList;
  },
  updateEnemy: async (enemyList: SessionsEnemiesModel[]) => {
    const newEnemys = enemyList.map((enemy) => {
      return sessionEnemyRepository.save(enemy);
    });
    await Promise.all(newEnemys);
  },
  createEnemy: async (enemyid: EnemyId, sessionid: GameSessionId, x: number, y: number) => {
    //enemyIDで区別される敵を生成する
    const enemy = await enemyRepository.getEnemy(enemyid);
    assert(enemy, 'enemy not found');
    const newEnemy: SessionsEnemiesModel = {
      id: sessionsEnemiesIdParser.parse(randomUUID()),
      enemyId: enemyid,
      sessionId: sessionid,
      x,
      y,
      //TODO 敵のHPを設定する(Enemy table側にHPの設定が必要？)
      hitPoint: 1,
      collisionRadius: enemy.collisionRadius,
    };
    await sessionEnemyRepository.save(newEnemy);
    return newEnemy;
  },
  killEnemy: async (id: SessionsEnemiesId, playerid: PlayerId) => {
    const enemy = await sessionEnemyRepository.deleteEnemy(id);
    assert(enemy, 'enemy not found');
    const enemyData = await enemyRepository.getEnemy(enemyIdParser.parse(enemy.enemyId));
    assert(enemyData, 'enemyData not found');
    await gameSessionUsecase.updatescore(playerid, enemyData.score);
  },
};
