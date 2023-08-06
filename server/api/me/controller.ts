import type { UserModel } from '$/commonTypesWithClient/models';
import { getUserModel } from '$/middleware/firebaseAdmin';
import { userIdParser } from '$/service/idParsers';
import { defineController, defineHooks } from './$relay';

export type AdditionalRequest = {
  user: UserModel;
};

export const hooks = defineHooks(() => ({
  preHandler: async (req, res) => {
    const user = await getUserModel(req.cookies.session);

    if (!user) {
      res.status(401).send();
      return;
    }

    req.user = {
      id: userIdParser.parse(user.uid),
      email: user.email ?? '',
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  },
}));

export default defineController(() => ({
  get: ({ user }) => {
    return { status: 200, body: user };
  },
}));
