import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';

const Game = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);
  const [playerImage] = useImage(staticPath.images.spaceship_png);
  const [enemyImage1] = useImage(staticPath.images.ufo_jpg);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    setEnemies(res);
  };

  const fetchBullets = async () => {
    const res = await apiClient.bullet.$get();
    setBullets(res);
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
      <Stage width={1920} height={1080}>
        <Layer>
          {bullets.map((bullet) => (
            <Circle x={bullet.pos.x} y={bullet.pos.y} radius={5} fill="red" key={bullet.bulletId} />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <Image
              image={playerImage}
              width={100}
              height={100}
              rotation={player.side === 'left' ? 90 : -90}
              x={player.pos.x}
              y={player.pos.y}
              key={player.userId}
            />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Image
              image={enemyImage1}
              width={80}
              height={80}
              x={enemy.pos.x}
              y={enemy.pos.y}
              key={enemy.enemyId}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
