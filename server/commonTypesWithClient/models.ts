import type { EnemyId, TaskId, UserId } from './branded';

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

export type EnemyModel = {
  id: EnemyId;
  pos: { x: number; y: number };
  speed: number;
  hp: number;
  radius: number;
  type: number;
};

export type PlayerModel = {
  userId: UserId;
  pos: { x: number; y: number };
  speed: number;
  hp: number;
  radius: number;
  score: number;
  name: string;
};

export type ConfigModel = {
  playerSpeed: number;
  playerSize: {
    h: number;
    w: number;
  };
  makeEnemyFrequency: number;
  enemySpeed: number;
  enemySize: {
    h: number;
    w: number;
  };
  // creenNumber:
};
