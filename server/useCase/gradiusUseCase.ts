import type { GameModel } from '$/commonTypesWithClient/models';
import { gradiusRepository } from '$/repository/gradiosRepository';
export const gradiusUaeCase = {
  input: async (type: number) => {
    const myPlane: GameModel = await gradiusRepository.findOfName('myPlane').game; //await意味ない
    const newXYZ = myPlane.xyz;
    newXYZ[type % 3] += (Math.floor(type / 3) - 0.5) * 2;
    const newMyPlane: GameModel = { ...myPlane, xyz: newXYZ };
    gradiusRepository.save(newMyPlane, 'myPlane');
  },
};
