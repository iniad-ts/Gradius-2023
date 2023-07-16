import type { UserId } from '$/commonTypesWithClient/branded';
import type { EventModel, GameModel } from '$/commonTypesWithClient/models';

const initGameModel = {
  user: null,
  type: 'owner',
  xyz: [-5, 0, 0],
  vector: [0, 0, 0],
  speed: 1,
  hp: 100,
  lv: 1,
  started: null,
  end: null,
};

const initEventModel = {
  owner: null,
  items: [],
  kill: 0,
  damage: 0,
  damaged: 0,
};

const gameModels: GameModel[] = [];

const eventModels: EventModel[] = [];

export const gradiusRepository = {
  crate: (user: UserId) => {
    const newGameModel = { ...initGameModel, user, started: new Date().getTime() };
    const newEventModel = { ...initEventModel, owner: user };
    gameModels.push(newGameModel);
    eventModels.push(newEventModel);
  },
  findOfId: (user: UserId): { game: GameModel[]; event: EventModel } => {
    const games = gameModels.filter((gameModel) => gameModel.user === user);
    const event = eventModels.filter((eventModel) => eventModel.owner === user)[0];
    if (games.length === 0) {
      gradiusRepository.crate(user);
    }
    console.log(games, event);
    return { game: games, event };
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
};
