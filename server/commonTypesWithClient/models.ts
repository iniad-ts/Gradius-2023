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

export type GameModel = {
  user: UserId | string;
  type: string;
  id: string;
  xyz: number[];
  vector: number[];
  speed: number;
  hp: number;
  created: number;
  end: number | null;
};

export type UserEventModel = {
  owner: string;
  lv: number;
  items: string[];
  kill: number;
  damage: number;
  damaged: number;
};

export const InitGameModel = {
  user: null,
  id: null,
  type: 'owner',
  xyz: [-5, 0, 0],
  vector: [0, 0, 0],
  speed: 1,
  hp: 100,
  created: null,
  end: null,
};

export const InitEventModel = {
  owner: null,
  lv: 1,
  items: [],
  kill: 0,
  damage: 0,
  damaged: 0,
};
