import type { BulletModel, EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import { Bullet } from 'src/components/Bullet/PlayerBullet';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { posWithDirSpeTim } from 'src/utils/posWithDirSpeTim';
import useImage from 'use-image';

const Game = () => {
  const router = useRouter();
  const display = router.query.display === undefined ? null : Number(router.query.display);
  if (display === null) {
    const Lobby = () => {
      const [displayNumber, setDisplayNumber] = useState<number>(0);
      const getDisplayNumber = async () => {
        const res = await apiClient.game.config.$get();
        if (res !== null) {
          setDisplayNumber(res);
        }
        if (res === 0) {
          router.push('/game/config');
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
    const [enemyImage] = useImage(staticPath.images.ufo_jpg);

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

    const updateHealth = (playerId: string) => {
      const newPlayers = players.map((player) => {
        if (player.id === playerId) {
          return { ...player, health: player.health - 1 };
        }
        return player;
      });
      setPlayers(newPlayers);
      const updatedPlayerModel = newPlayers.find((player) => player.id === playerId);
      if (!updatedPlayerModel) return;
      const res = apiClient.player.status.$post({
        body: { player: updatedPlayerModel },
      });
      console.log(res);
    };

    //衝突判定の距離
    const collisionDistance = 50;

    //敵と弾の衝突判定
    const checkCollisionBullet = () => {
      const newEnemies = enemies.filter((enemy) => {
        const hitBullet = bullets.find((bullet) => {
          const bulletPosition = posWithDirSpeTim(bullet, currentTime);
          const distance = Math.sqrt(
            Math.pow(enemy.createdPosition.x - bulletPosition[0], 2) +
              Math.pow(enemy.createdPosition.y - bulletPosition[1], 2)
          );
          return distance < collisionDistance;
        });
        if (hitBullet && hitBullet.playerId) {
          apiClient.enemy.$delete({
            body: {
              enemyId: enemy.id,
              userId: hitBullet.playerId,
            },
          });
          apiClient.bullet.$delete({ body: { bulletId: hitBullet.id } });
          return false;
        }
        return true;
      });
      setEnemies(newEnemies);
    };

    //敵とプレイヤーの衝突判定
    const checkCollisionPlayer = () => {
      const newEnemies = enemies.filter((enemy) => {
        const hitPlayer = players.find((player) => {
          const distance = Math.sqrt(
            Math.pow(enemy.createdPosition.x - player.position.x, 2) +
              Math.pow(enemy.createdPosition.y - player.position.y, 2)
          );
          return distance < collisionDistance;
        });
        if (hitPlayer) {
          apiClient.enemy.$delete({
            body: {
              enemyId: enemy.id,
              userId: hitPlayer.id,
            },
          });
          updateHealth(hitPlayer.id);
          return false;
        }
        return true;
      });
      setEnemies(newEnemies);
    };

    useEffect(() => {
      const cancelId = requestAnimationFrame(() => {
        fetchPlayers(display);
        fetchEnemies(display);
        fetchBullets(display);
        checkCollisionBullet();
        checkCollisionPlayer();
        setCurrentTime(Date.now());
      });
      return () => cancelAnimationFrame(cancelId);
    });

    return (
      <div>
        <Stage width={1920} height={1080}>
          <Layer>
            {bullets.map((bullet) => (
              <Bullet key={bullet.id} bullet={bullet} currentTime={currentTime} />
            ))}
          </Layer>
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
                width={80}
                height={80}
                x={enemy.createdPosition.x}
                y={enemy.createdPosition.y}
                key={enemy.id}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  };

  return <GameCanvas />;
};

export default Game;
