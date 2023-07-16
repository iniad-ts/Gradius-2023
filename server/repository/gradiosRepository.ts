import type { UserId } from '$/commonTypesWithClient/branded';
import {
  InitEventModel,
  InitGameModel,
  type EventModel,
  type GameModel,
} from '$/commonTypesWithClient/models';

const gameModels: GameModel[] = [];

const eventModels: EventModel[] = [];

export const gradiusRepository = {
  create: (game: GameModel, event: EventModel | null) => {
    const newGameModel = { ...game };
    gameModels.push(newGameModel);
    if (event !== null) {
      const newEventModel = { ...event };
      eventModels.push(newEventModel);
    }
  },
  findOfId: (user: UserId): { games: GameModel[]; event: EventModel } => {
    const games = gameModels.filter((gameModel) => gameModel.user === user);
    const event = eventModels.filter((eventModel) => eventModel.owner === user)[0];
    if (games.length === 0) {
      gradiusRepository.create(
        { ...InitGameModel, user, started: new Date().getTime() },
        { ...InitEventModel, owner: user }
      );
    }
    console.log(games, event);
    return { games, event };
  },
  findWithXYZ: (xyz: number[]): GameModel[] => {
    return gameModels.filter((gameModel) => gameModel.xyz === xyz);
  },
  findWithtype: (type: string) => gameModels.filter((gra) => gra.type === type),
  save: (gameModel: GameModel, name: string) => {
    gameModels.forEach((oneGameModel, i) => {
      if (oneGameModel.user === name) {
        gameModels[i] = gameModel;
      }
    });
  },
  getGameModels: () => gameModels,
  getEventModel: (user: UserId) => eventModels.filter((event) => event.owner === user)[0],
};
