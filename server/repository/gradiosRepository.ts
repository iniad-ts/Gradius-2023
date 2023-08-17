import type { GameModel } from '$/commonTypesWithClient/models';

const gameModels: GameModel[] = [{ name: 'myPlane', xyz: [-5, 0, 0], hp: 100, lv: 1 }];

export const gradiusRepository = {
  findOfName: (name: string): GameModel => {
    return gameModels.filter((gameModel) => gameModel.name === name)[0];
  },
  save: (gameModel: GameModel, name: string) => {
    gameModels.forEach((oneGameModel, i) => {
      if (oneGameModel.name === name) {
        gameModels[i] = gameModel;
      }
    });
    console.log(gameModels[0].xyz);
  },
};
