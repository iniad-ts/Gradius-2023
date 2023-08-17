import type { GameModel } from '$/commonTypesWithClient/models';
import { gradiusRepository } from '$/repository/gradiosRepository';
export const gradiusUaeCase = {
  input: async (type: number) => {
    const myPlane: GameModel = await gradiusRepository
      .findOfName('myPlane')
      .game.filter((gra) => gra.type === 'owner')[0];
    const newXYZ = myPlane.xyz;
    newXYZ[type % 3] += (Math.floor(type / 3) - 0.5) * 2;
    const newMyPlane: GameModel = { ...myPlane, xyz: newXYZ };
    gradiusRepository.save(newMyPlane, 'myPlane');
  },
  // clash: async () => {クラッシュむずくね？？？
  //   const ownersXYZ = gradiusRepository
  //     .findWithtype('owner')
  //     .map((gra) => ({ name: gra.name, xyz: gra.xyz }));
  //   const beamsXYZ = gradiusRepository
  //     .findWithtype('beam')
  //     .map((gra) => ({ name: gra.name, xyz: gra.xyz, owner: gra.owner }));
  //   const othersBeamsXYZ = (name: string) =>
  //     ownersXYZ.map((owner) =>
  //       beamsXYZ.filter((beam) => beam.owner !== owner.name).map((other) => other.xyz)
  //     );
  //   ownersXYZ.map((owner) => {
  //     //
  //   });
  },
};
