import { InitEventModel, InitGameModel } from '$/commonTypesWithClient/models';
import { gradiusRepository } from '$/repository/gradiusRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: ({ user }) => ({
    status: 201,
    body: gradiusRepository.create(
      { ...InitGameModel, user: user.id, created: new Date().getTime() },
      { ...InitEventModel, owner: user.id }
    ),
  }),
}));
