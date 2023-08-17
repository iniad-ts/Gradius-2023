import type { TaskId, UserId } from './branded';

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
  // id: EnemyId;
  pos: { x: number; y: number };
  radius: number;
  speed: number;
  score: number;
  kinds: string;
  hp: number;
  // size_width: number;
  // size_height: number;
};
