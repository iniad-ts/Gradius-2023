import { firebaseAdmin } from '$/middleware/firebaseAdmin';
import { init } from '$/service/app';
import { API_BASE_PATH, FIREBASE_AUTH_EMULATOR_HOST, PORT } from '$/service/envValues';
import { prismaClient } from '$/service/prismaClient';
import { bulletUsecase } from '$/usecase/bulletUsecase';
import { collisionUsecase } from '$/usecase/collisionUsecase';
import { enemyUsecase } from '$/usecase/enemyUsecase';
import aspida from '@aspida/axios';
import axios from 'axios';
import { exec } from 'child_process';
import type { FastifyInstance } from 'fastify';
import { initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  connectAuthEmulator,
  getAuth,
  signInWithCredential,
} from 'firebase/auth';
import util from 'util';
import { afterEach, beforeEach } from 'vitest';
import api from '../../api/$api';
let server: FastifyInstance;

export const testUser = { name: 'vitest-user', email: 'vitest@example.com' };

const unneededServer = (file: { filepath?: string } | undefined) =>
  !/\/tests\/api\/.+\.test\.ts$/.test(file?.filepath ?? '');
const agent = axios.create();
export const apiClient = api(
  aspida(agent, { baseURL: `http://127.0.0.1:${PORT}${API_BASE_PATH}` })
);

beforeEach(async (info) => {
  if (unneededServer(info.meta.file)) return;

  await util.promisify(exec)('npx prisma migrate reset --force');
  await util.promisify(exec)('npx prisma db seed');
  server = init();
  await server.listen({ port: PORT, host: '0.0.0.0' });
  const auth = getAuth(initializeApp({ apiKey: 'fake-api-key', authDomain: 'localhost' }));
  connectAuthEmulator(auth, `http://${FIREBASE_AUTH_EMULATOR_HOST}`, { disableWarnings: true });
  const result = await signInWithCredential(
    auth,
    GithubAuthProvider.credential(JSON.stringify({ sub: testUser.name, email: testUser.email }))
  );
  const idToken = await result.user.getIdToken();
  const res = await apiClient.session.post({ body: { idToken } });
  agent.defaults.headers.Cookie = res.headers['set-cookie'][0].split(';')[0];
});

afterEach(async (info) => {
  if (unneededServer(info.meta.file)) return;
  const user = await firebaseAdmin.auth().getUserByEmail(testUser.email);
  await firebaseAdmin.auth().deleteUser(user.uid);

  await prismaClient.$disconnect();
  collisionUsecase.stop();
  enemyUsecase.stop();
  bulletUsecase.stop();
  await server.close();
});
