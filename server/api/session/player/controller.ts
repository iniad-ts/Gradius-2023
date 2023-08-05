import type { CookieSerializeOptions } from '@fastify/cookie';
import { defineController } from './$relay';

export type AdditionalRequest = {
  body: { id: string };
};

const options: CookieSerializeOptions = {
  httpOnly: true,
  secure: true,
  path: '/',
  sameSite: 'none',
};

export default defineController(() => ({
  post: {
    hooks: {
      preHandler: async (req, reply) => {
        const expiresIn = 60 * 60 * 24 * 5 * 1000;

        reply.setCookie('session-player', req.body?.id ?? '', {
          ...options,
          expires: new Date(Date.now() + expiresIn),
        });
      },
    },
    handler: () => {
      return { status: 200, body: { status: 'success' } };
    },
  },
  delete: {
    hooks: {
      preHandler: async (req, reply) => {
        reply.clearCookie('session-player', options);
      },
    },
    handler: () => {
      return { status: 200, body: { status: 'success' } };
    },
  },
}));
