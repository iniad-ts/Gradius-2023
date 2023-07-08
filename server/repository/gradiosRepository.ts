import type { EventModel, GameModel } from '$/commonTypesWithClient/models';

const initGameModel = { name: null, xyz: [-5, 0, 0], hp: 100, lv: 1 };

const initEventModel = {
  name: null,
  started: null,
  level: null,
  kill: 0,
  damage: 0,
  damaged: 0,
  end: null,
};

const gameModels: GameModel[] = [];

const eventModels: EventModel[] = [];

export const gradiusRepository = {
  findOfName: (name: string): { game: GameModel; event: EventModel } => {
    console.log(name);
    const game = gameModels.filter((gameModel) => gameModel.name === name)[0];
    const event = eventModels.filter((eventModel) => eventModel.name === name)[0];
    console.log(game, event);
    return {
      game: gameModels.filter((gameModel) => gameModel.name === name)[0],
      event: eventModels.filter((eventModel) => eventModel.name === name)[0],
    };
  },
  save: (gameModel: GameModel, name: string) => {
    gameModels.forEach((oneGameModel, i) => {
      if (oneGameModel.name === name) {
        gameModels[i] = gameModel;
      }
    });
    console.log(gameModels[0].xyz);
  },
  crate: (name: string, level: number) => {
    if (gameModels.filter((gameModel) => gameModel.name === name).length === 0) {
      const newGameModel = { ...initGameModel, name };
      gameModels.push(newGameModel);
      const newEventModel = { ...initEventModel, name, started: new Date(), level };
      eventModels.push(newEventModel);
    }
  },
};
