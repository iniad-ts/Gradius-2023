import type { BulletId, EnemyId, GameId, TaskId, UserId } from './branded';

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

export type GameModel = {
  id: GameId;
  displayNumber: number;
};

export type PlayerModel = {
  id: UserId;
  name: string;
  pos: {
    x: number;
    y: number;
  };
  score: number;
  Items:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  side: 'left' | 'right';
  isPlaying: boolean;
};

export type EnemyModel = {
  id: EnemyId;
  direction: {
    x: number;
    y: number;
  };
  createdPos: {
    x: number;
    y: number;
  };
  createdAt: number;
  type: number;
};

export type BulletModel = {
  id: BulletId;
  direction: {
    x: number;
    y: number;
  };
  createdPos: {
    x: number;
    y: number;
  };
  createdAt: number;
  side: 'left' | 'right';
  shooterId: string;
};
