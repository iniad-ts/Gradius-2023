import { InitEventModel, InitGameModel } from '$/commonTypesWithClient/models';
import { gradiusRepository } from '$/repository/gradiusRepository';
import { randomUUID } from 'crypto';
import { defineController } from './$relay';

export default defineController(() => ({
  post: ({ user }) => ({
    status: 201,
    body: gradiusRepository.create(
      { ...InitGameModel, user: user.id, id: randomUUID(), created: new Date().getTime() },
      { ...InitEventModel, owner: user.id }
    ),
  }),
}));
