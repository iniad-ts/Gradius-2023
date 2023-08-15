import type { BulletModel, EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import Konva from 'konva';
import { useRouter } from 'next/router';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { Bullet } from 'src/components/Bullet/PlayerBullet';
import { Enemies } from 'src/components/Enemies/Enemies';
import Lobby from 'src/components/Lobby/Lobby';
import { Player } from 'src/components/Player/Player';
import { apiClient } from 'src/utils/apiClient';
import { collisionBullets } from 'src/utils/collision';
import { posWithDirSpeTim } from 'src/utils/posWithDirSpeTim';
import styles from './index.module.css';

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
    const ufoRefs = useRef<RefObject<Konva.Image>[]>([]);

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

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
              apiClient.player.delete({
                body: { player, bulletId: bullet.id, display },
              })
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
          await apiClient.game.$post({ body: { player: hitPlayer, enemy, display } });
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
        checkCollisionPlayerBullet();
        checkCollisionPlayerAndEnemy();
        checkCollisionEnemyBullet();
        setCurrentTime(Date.now());
      });
      return () => cancelAnimationFrame(cancelId);
    }, []);

    useEffect(() => {
      const anim = new Konva.Animation((layer) => {
        ufoRefs.current.forEach((ufoRef) => {
          if (ufoRef.current) {
            ufoRef.current.offset({
              x:
                Math.cos(
                  Math.floor(((layer?.time ?? 0) / 10 + ufoRef.current.x()) * Math.PI) / 100
                ) * 5,
              y:
                Math.sin(
                  Math.floor(((layer?.time ?? 0) / 10) * Math.PI + ufoRef.current.y()) / 100
                ) * 5,
            });
          }
        });
      }, ufoRefs.current[0]?.current?.getLayer());
      anim.start();
      return () => {
        anim.stop();
      };
      const setWindowSize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      setWindowSize();
      window.addEventListener('resize', setWindowSize);
      return () => window.removeEventListener('resize', setWindowSize);
    }, []);

    return (
      <div className={styles['canvas-container']}>
        <Stage
          width={1920}
          height={1080}
          style={{
            /* stylelint-disable function-no-unknown */
            transform: `
            scale( ${width / 1920}, ${height / 1080} )
            translate(${(width - 1920) / 2}px, ${(height - 1080) / 2}px)`,
            /* stylelint-enable function-no-unknown */
          }}
        >
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
              <Player key={player.id} player={player} />
            ))}
          </Layer>
          <Layer>
            {/* アニメーションの関係で、Enemyは中でmap */}
            <Enemies enemies={enemies} />
          </Layer>
        </Stage>
      </div>
    );
  };

  return <GameCanvas />;
};

export default Game;
