import type {
  EnemyId,
  GameSessionId,
  PlayerId,
  PowerUpId,
  SessionsEnemiesId,
  StageId,
  TaskId,
  UserId,
} from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type GameSessionModel = {
  id: GameSessionId;
  playerId: PlayerId;
  stageId: StageId;
  score: number;
  startTime: Date;
  endTime: Date | null;
};

export type PlayerModel = {
  id: PlayerId;
  name: string;
  x: number;
  y: number;
};

export type PlayerPowerUpModel = {
  playerid: PlayerId;
  powerUpId: PowerUpId;
};

export type PowerUpModel = {
  id: PowerUpId;
  name: string;
};

export type SessionsEnemiesModel = {
  id: SessionsEnemiesId;
  sessionId: GameSessionId;
  enemyId: EnemyId;
  x: number;
  y: number;
  hitPoint: number;
  collisionRadius: number;
};

export type EnemyModel = {
  id: EnemyId;
  collisionRadius: number;
  score: number;
};
