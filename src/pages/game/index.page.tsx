import type { BulletModel, EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { useRouter } from 'next/router';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
=======
import type { RefObject } from 'react';
import { createRef, useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
>>>>>>> parent of a944c0e (Merge branch 'main' of INIAD-Devs/Gra23-B into hit)
import { Bullet } from 'src/components/Bullet/PlayerBullet';
import Lobby from 'src/components/Lobby/Lobby';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { collisionBullets } from 'src/utils/collision';
import useImage from 'use-image';

const Game = () => {
  const router = useRouter();
  const display = router.query.display === undefined ? null : Number(router.query.display);
  if (display === null) {
    return <Lobby />; // Lobbyコンポーネントの呼び出し
  }

  // if (!user) return <Loading visible />;
  const GameCanvas = () => {
    const [players, setPlayers] = useState<PlayerModel[]>([]);
    const [enemies, setEnemies] = useState<EnemyModel[]>([]);
    const [playerBullets, setPlayerBullets] = useState<BulletModel[]>([]);
    const [enemyBullets, setEnemyBullets] = useState<BulletModel[]>([]);
    const [currentTime, setCurrentTime] = useState<number>(Date.now());
    const [shipImage] = useImage(staticPath.images.spaceship_png);
    const [enemyImage3] = useImage(staticPath.images.ufo_3_PNG);
    const ufoRefs = useRef<RefObject<Konva.Image>[]>([]);

    const fetchPlayers = async (display: number) => {
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
        setPlayerBullets(res.players);
        setEnemyBullets(res.enemies);
      }
    };

    const checkCollisionPlayerBullet = async () => {
      const remainingEnemies = [];
      for (const enemy of enemies) {
        const hitBullet: BulletModel | undefined = collisionBullets(
          enemy.createdPosition,
          playerBullets,
          currentTime
        )[0];
        if (hitBullet !== undefined && hitBullet.playerId) {
          const body = {
            enemyId: enemy.id,
            playerId: hitBullet.playerId,
          };
          await apiClient.enemy.$delete({ body });
          await apiClient.bullet.$delete({ body: { bulletId: hitBullet.id } });
        } else {
          remainingEnemies.push(enemy);
        }
      }
    };

    const checkCollisionEnemyBullet = async () => {
      Promise.all(
        players
          .map((player) => {
            const hitBullets = collisionBullets(player.position, enemyBullets, currentTime);
            return hitBullets.map((bullet) =>
              apiClient.player.delete({ body: { player, bulletId: bullet.id } })
            );
          })
          .flat()
      ).then((results) =>
        results.forEach((result) => {
          result;
        })
      );
    };

    const checkCollisionPlayerAndEnemy = async () => {
      const remainingEnemies = [];
      for (const enemy of enemies) {
        const COLLISION_DISTANCE = 100;
        const hitPlayer = players.find((player) => {
          const distanceSquared =
            Math.pow(enemy.createdPosition.x - player.position.x, 2) +
            Math.pow(enemy.createdPosition.y - player.position.y, 2);
          return distanceSquared < COLLISION_DISTANCE ** 2;
        });
        if (hitPlayer !== undefined) {
          apiClient.game.$post({ body: { player: hitPlayer, enemy, display } });
        } else {
          remainingEnemies.push(enemy);
        }
      }
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
            {playerBullets.map((bullet) => (
              <Bullet key={bullet.id} bullet={bullet} currentTime={currentTime} />
            ))}
          </Layer>
          <Layer>
            {enemyBullets.map((bullet) => (
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
            {enemies.map((enemy, i) => {
              ufoRefs.current[i] = createRef<Konva.Image>();
              return (
                <Image
                  image={
                    enemy.type === 1 ? enemyImage1 : enemy.type === 2 ? enemyImage2 : enemyImage3
                  }
                  width={80}
                  height={80}
                  x={enemy.createdPosition.x - 40}
                  y={enemy.createdPosition.y - 40}
                  key={enemy.id}
                  ref={ufoRefs.current[i]}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  };

  return <GameCanvas />;
};

export default Game;
