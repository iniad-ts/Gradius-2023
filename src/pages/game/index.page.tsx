import type { BulletModel, EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import { Bullet } from 'src/components/Bullet/PlayerBullet';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';

const Game = () => {
  // const [user] = useAtom(userAtom);
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [shipImage] = useImage(staticPath.images.spaceship_png);
  const [enemyImage] = useImage(staticPath.images.enemy_spaceship_png);

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
      setCurrentTime(Date.now());
    });
    return () => cancelAnimationFrame(cancelId);
  }, []);
  // if (!user) return <Loading visible />;
  return (
    <div>
      <Stage width={1920} height={1080}>
        <Layer>
          {players.map((player) => (
            <Image
              image={shipImage}
              width={100}
              height={100}
              rotation={player.team === 'red' ? 90 : -90}
              x={player.position.x + 50}
              y={player.position.y - 50}
              key={player.id}
            />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Image
              image={enemyImage}
              width={50}
              height={50}
              rotation={90}
              x={enemy.createdPosition.x}
              y={enemy.createdPosition.y}
              key={enemy.id}
            />
          ))}
        </Layer>
        <Layer>
          {bullets.map((bullet) => (
            <Bullet key={bullet.id} bullet={bullet} currentTime={currentTime} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
