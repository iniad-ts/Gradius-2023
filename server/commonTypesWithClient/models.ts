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
  endTime?: Date | null;
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
  session_id: GameSessionId;
  enemy_id: EnemyId;
  x: number;
  y: number;
  hit_point: number;
  collision_radius: number;
};

export type EnemyModel = {
  id: EnemyId;
  collision_radius: number;
  score: number;
};
