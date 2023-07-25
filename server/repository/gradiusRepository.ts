import type { UserId } from '$/commonTypesWithClient/branded';
import { type EventModel, type GameModel } from '$/commonTypesWithClient/models';

const gameModels: GameModel[] = [];

const eventModels: EventModel[] = [];

export const gradiusRepository = {
  create: (game: GameModel, event: EventModel | null) => {
    // console.log(eventModels.filter((e) => e.owner === event?.owner).length);
    if (eventModels.filter((e) => e.owner === event?.owner).length > 0) {
      return true;
    }
    const newGameModel = { ...game };
    gameModels.push(newGameModel);
    if (event !== null) {
      const newEventModel = { ...event };
      eventModels.push(newEventModel);
    }
    return false;
  },
  findOfUser: (user: UserId): { games: GameModel[]; event: EventModel } => {
    const games = gameModels.filter((gameModel) => gameModel.user === user);
    const event = eventModels.filter((eventModel) => eventModel.owner === user)[0];
    // console.log(games, event);
    return { games, event };
  },
  update: () => {
    const currentGameModel: GameModel[] = JSON.parse(JSON.stringify(gameModels));
    gameModels.map((gameModel, i) => {
      const difference = gameModel.created - currentGameModel[i].created;
      const newXYZ = gameModel.xyz.map(
        (d, j) => d + Math.round(gameModel.vector[j] * difference * 0.01)
      );
      return { ...gameModel, xyz: newXYZ, created: new Date().getTime() };
    });
  },
  findOfXYZ: (xyz: number[]) => gameModels.filter((gameModel) => gameModel.xyz === xyz),
  findOfType: (type: string) => gameModels.filter((gra) => gra.type === type),
  save: (gameModel: GameModel, user: UserId) => {
    gameModels.forEach((oneGameModel, i) => {
      if (oneGameModel.user === user) {
        gameModels[i] = gameModel;
      }
    });
  },
  getGameModels: () => gameModels,
  getEventModel: (user: UserId) => eventModels.filter((event) => event.owner === user)[0],
};
