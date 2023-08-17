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
};

export type playerModel = {
  pos: { x: number; y: number };
  hp: number;
  score: number;
  radius: number;
  speed: number;
};
