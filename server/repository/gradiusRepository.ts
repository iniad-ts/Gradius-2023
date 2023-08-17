import type { UserId } from '$/commonTypesWithClient/branded';
import { type GameModel, type UserEventModel } from '$/commonTypesWithClient/models';

const gameModels: GameModel[] = [];

const eventModels: UserEventModel[] = [];

export const gradiusRepository = {
  create: (game: GameModel, event: UserEventModel | null) => {
    // console.log(eventModels.filter((e) => e.owner === event?.owner).length);
    if (eventModels.filter((e) => e.owner === event?.owner).length > 0) {
      return true;
    }
    gameModels.push(game);
    if (event !== null) {
      eventModels.push(event);
    }
    return false;
  },
  findOfUser: (user: UserId): { games: GameModel[]; event: UserEventModel } => {
    const games = gameModels.filter((gameModel) => gameModel.user === user);
    const event = eventModels.filter((eventModel) => eventModel.owner === user)[0];
    // console.log(games, event);
    return { games, event };
  },
  update: () => {
    const currentGameModels: GameModel[] = JSON.parse(JSON.stringify(gameModels));
    gameModels.forEach((gameModel, i) => {
      const difference = new Date().getTime() - currentGameModels[i].created;
      const newXYZ = gameModel.xyz.map(
        (d, j) => d + Math.round(gameModel.vector[j] * difference * 0.01 * gameModel.speed)
      );
      gradiusRepository.save(
        { ...gameModel, xyz: newXYZ, created: new Date().getTime() },
        gameModel.id
      );
    });
    collision(gameModels).forEach((collision) => {
      const myPlaneModel = gameModels.filter((gameModel) =>
        [gameModel.user === collision?.user, gameModel.type === 'owner'].every(Boolean)
      )[0];
      const hit = collision?.collisionBeamIds.map(
        (collisionBeamId) =>
          gameModels.filter((gameModel) => gameModel.id === collisionBeamId)[0].hp
      );
      const hit2 = hit?.reduce((sum, element) => sum + element);
      gradiusRepository.save({ ...myPlaneModel }, myPlaneModel.id);
    });
    console.table(gameModels.map((object) => [object.id, ...object.xyz]));
    return gradiusRepository.getGameModels();
  },
  findOfXYZ: (xyz: number[]) => gameModels.filter((gameModel) => gameModel.xyz === xyz),
  findOfType: (type: string) => gameModels.filter((gra) => gra.type === type),
  save: (gameModel: GameModel, id: string) => {
    gameModels.forEach((oneGameModel, i) => {
      if (oneGameModel.id === id) {
        gameModels[i] = gameModel;
      }
    });
  },
  getGameModels: () => gameModels,
  getEventModel: (user: UserId) => eventModels.filter((event) => event.owner === user)[0],
};

const collision = (
  gameModels: GameModel[]
): ({ user: UserId | string; collisionBeamIds: string[] } | null)[] => {
  const ownerModels: GameModel[] = gameModels.filter((object) => object.type === 'owner');
  const collisions: ({ user: UserId | string; collisionBeamIds: string[] } | null)[] = [];
  ownerModels.forEach((myPlaneModel) => {
    const othersBeamModels = gameModels.filter((object) =>
      [object.user !== myPlaneModel.user, object.type === 'beam'].every(Boolean)
    );
    const collisionBeams = othersBeamModels.filter((otherBeam) =>
      otherBeam.xyz
        .map((d, i) => [d < myPlaneModel.xyz[i] + 25, d > myPlaneModel.xyz[i] - 25].every(Boolean))
        .every(Boolean)
    );
    collisions.push({
      user: myPlaneModel.user,
      collisionBeamIds: [...collisionBeams.map((collisionBeam) => collisionBeam.id)],
    });
  });
  return collisions;
};
