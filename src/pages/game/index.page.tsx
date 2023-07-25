import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import type { BulletModelWithPosition } from '$/usecase/bulletUseCase';
import { useEffect, useState } from 'react';
import { Circle, Layer, Stage, Wedge } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

const Game = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModelWithPosition[]>([]);

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
          {players.map((player) => (
            <Wedge
              fill="red"
              angle={60}
              radius={player.radius}
              rotation={150}
              x={player.position.x}
              y={player.position.y}
              key={player.id}
            />
          ))}
        </Layer>
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
