import { gradiusRepository } from '$/repository/gradiusRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await gradiusRepository.getGameModels() }), //display表示用の情報を取得
  post: async ({ user }) => ({ status: 201, body: await gradiusRepository.findOfId(user.id) }), //controller表示用の情報を取得
}));
