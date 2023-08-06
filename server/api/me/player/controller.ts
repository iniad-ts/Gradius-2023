import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ player }) => {
    return { status: 200, body: player };
  },
}));
