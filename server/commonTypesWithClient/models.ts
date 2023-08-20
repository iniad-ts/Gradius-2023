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

export type PlayerModel = {
  userId: UserId;
  name: string;
  pos: {
    x: number;
    y: number;
  };
  score: number;
  vector: {
    x: number;
    y: number;
  };
  Items:
    | {
        id: string;
        name: string;
      }[]
    | undefined;

  side: 'left' | 'right';
};

export type EnemyModel = {
  enemyId: EnemyId;
  score: number;
  pos: {
    x: number;
    y: number;
  };
  vector: {
    x: number;
    y: number;
  };
  type: number;
};
