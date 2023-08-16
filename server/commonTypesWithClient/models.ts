import type { RoomId, TaskId, UserId } from './branded';

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

export type RoomModel = {
  roomId: RoomId;
  roomName: string;
  status: string;
  id1p: UserId;
  id2p: UserId;
  position1p: number[];
  position2p: number[];
  bullet: string;
  enemy: string;
  background: number[];
  screen: number;
  created: string;
};
