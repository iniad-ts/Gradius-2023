import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import type { BulletModelWithPosition } from '$/usecase/bulletUseCase';
import { useEffect, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';

const Game = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModelWithPosition[]>([]);
  const [shipImage] = useImage(staticPath.images.spaceship_png);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    if (res !== null) {
      setPlayers(res);
    }
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    if (res !== null) {
      setEnemies(res);
    }
  };

  const fetchBullets = async () => {
    const res = await apiClient.bullet.$get();
    if (res !== null) {
      setBullets(res);
    }
  };
  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchPlayers();
      fetchEnemies();
      fetchBullets();
    });
    return () => cancelAnimationFrame(cancelId);
  });
  return (
    <div>
      <Stage width={1000} height={700}>
        <Layer>
          {bullets.map((bullet) => (
            <Circle
              fill="red"
              radius={bullet.radius}
              x={bullet.position.x}
              y={bullet.position.y}
              key={bullet.id}
            />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <Image
              image={shipImage}
              width={player.radius * 2}
              height={player.radius * 2}
              rotation={90}
              x={player.position.x + player.radius}
              y={player.position.y - player.radius}
              key={player.id}
            />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Circle
              fill="blue"
              radius={enemy.radius}
              x={enemy.position.x}
              y={enemy.position.y}
              key={enemy.id}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
