import type { PlayerModel } from '$/commonTypesWithClient/models';
import { Image, Text } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type props = {
  player: PlayerModel;
};

export const Player = ({ player }: props) => {
  const [shipImage] = useImage(staticPath.images.spaceship_png);

  return (
    <>
      <Image
        image={shipImage}
        width={100}
        height={100}
        rotation={player.team === 'red' ? 90 : -90}
        x={player.position.x + 50}
        y={player.position.y - 50}
        key={player.id}
      />
      <Text
        text={player.name}
        x={player.position.x - 10}
        y={player.position.y + 60}
        fontSize={24}
        fill="black"
        align="center"
      />
    </>
  );
};
