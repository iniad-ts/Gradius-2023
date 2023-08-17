import type { PlayerModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';

const Game = () => {
  // const [user] = useAtom(userAtom);
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [shipImage] = useImage(staticPath.images.spaceship_png);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    if (res !== null) {
      setPlayers(res);
    }
  };

  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchPlayers();
      console.log('fetchPlayers');
    });
    return () => cancelAnimationFrame(cancelId);
  });
  // if (!user) return <Loading visible />;
  return (
    <div>
      <Stage width={1920} height={1080}>
        <Layer>
          {players.map((player) => (
            <Image
              image={shipImage}
              width={50 * 2}
              height={50 * 2}
              rotation={90}
              x={player.position.x + 50}
              y={player.position.y - 50}
              key={player.id}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
