import server from '$/$server';
import { API_BASE_PATH, CORS_ORIGIN } from '$/service/envValues';
import { bulletUsecase } from '$/usecase/bulletUsecase';
import { collisionUsecase } from '$/usecase/collisionUsecase';
import { enemyUsecase } from '$/usecase/enemyUsecase';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import type { FastifyServerFactory } from 'fastify';
import Fastify from 'fastify';

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory });
  app.register(helmet);
  app.register(cors, { origin: CORS_ORIGIN, credentials: true });
  app.register(cookie);
  server(app, { basePath: API_BASE_PATH });
  bulletUsecase.init();
  enemyUsecase.init();
  collisionUsecase.init();

  return app;
};
