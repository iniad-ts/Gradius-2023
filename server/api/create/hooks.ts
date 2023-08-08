import type { RoomModel, UserModel } from '$/commonTypesWithClient/models';
import { getUserModel } from '$/middleware/firebaseAdmin';
import { defineHooks } from './$relay';
import { userIdParser } from '$/service/idParsers';

export type AdditionalRequest = {
  user: UserModel;
  room: RoomModel;
};
export default defineHooks(() => ({
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
