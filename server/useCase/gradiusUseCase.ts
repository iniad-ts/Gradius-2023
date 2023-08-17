import type { UserId } from '$/commonTypesWithClient/branded';
import type { GameModel } from '$/commonTypesWithClient/models';
import { gradiusRepository } from '$/repository/gradiusRepository';
export const gradiusUaeCase = {
  input: async (type: number, user: UserId) => {
    if (type === 6) {
      // gradiusUaeCase.beam();
    } else {
      const myPlane: GameModel = await gradiusRepository
        .findOfId(user)
        .games.filter((gra) => gra.type === 'owner')[0]; //ownerは1つ
      const newXYZ = myPlane.xyz;
      newXYZ[type % 3] += (Math.floor(type / 3) - 0.5) * 2;
      const newMyPlane: GameModel = { ...myPlane, xyz: newXYZ };
      gradiusRepository.save(newMyPlane, 'myPlane');
    }
  },
  // beam: () => {
  //   gradiusRepository.
  // },
  // clash: async () => {クラッシュむずくね？？？
  //   const ownersXYZ = gradiusRepository
  //     .findWithType('owner')
  //     .map((gra) => ({ name: gra.name, xyz: gra.xyz }));
  //   const beamsXYZ = gradiusRepository
  //     .findWithType('beam')
  //     .map((gra) => ({ name: gra.name, xyz: gra.xyz, owner: gra.owner }));
  //   const othersBeamsXYZ = (name: string) =>
  //     ownersXYZ.map((owner) =>
  //       beamsXYZ.filter((beam) => beam.owner !== owner.name).map((other) => other.xyz)
  //     );
  //   ownersXYZ.map((owner) => {
  //     //
  //   });
  // },
};
