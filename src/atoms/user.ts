import type { PlayerModel, UserModel } from '$/commonTypesWithClient/models';
import { atom } from 'jotai';

export const userAtom = atom<UserModel | null>(null);

export const playerAtom = atom<PlayerModel | null>(null);
