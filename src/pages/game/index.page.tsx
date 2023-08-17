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

  if (display === null) {
    const Lobby = () => {
      const [displayNumber, setDisplayNumber] = useState<number>(0);
      const getDisplayNumber = async () => {
        const res = await apiClient.game.config.$get();
        if (res !== null) {
          setDisplayNumber(res);
        }
      };

      useEffect(() => {
        getDisplayNumber();
      }, []);

      return (
        <>
          {[...Array(displayNumber)].map((_, i) => (
            <button onClick={() => router.push({ query: { display: i } })} key={i}>
              {i}
            </button>
          ))}
        </>
      );
    };

    return <Lobby />;
  }

  // if (!user) return <Loading visible />;
  const GameCanvas = () => {
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const [enemies, setEnemies] = useState<EnemyModel[]>([]);
    const [bullets, setBullets] = useState<BulletModel[]>([]);
    const [currentTime, setCurrentTime] = useState<number>(Date.now());
    const [shipImage] = useImage(staticPath.images.spaceship_png);
    const [enemyImage] = useImage(staticPath.images.enemy_spaceship_png);

    const fetchPlayers = async (display: number) => {
      const res = await apiClient.player.$get({ query: { display } });
      if (res !== null) {
        setPlayers(res);
      }
    };

    const fetchEnemies = async (display: number) => {
      const res = await apiClient.enemy.$get({ query: { display } });
      if (res !== null) {
        setEnemies(res);
      }
    };

    const fetchBullets = async (display: number) => {
      const res = await apiClient.bullet.$get({ query: { display } });
      if (res !== null) {
        setBullets(res);
      }
    };

    useEffect(() => {
      const cancelId = requestAnimationFrame(() => {
        fetchPlayers(display);
        fetchEnemies(display);
        fetchBullets(display);
        setCurrentTime(Date.now());
        console.log('fetch');
      });
      return () => cancelAnimationFrame(cancelId);
    });

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
