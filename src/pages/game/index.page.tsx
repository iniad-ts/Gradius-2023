import type { BulletModel, EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { Background } from 'src/components/Background/Background';
import { Bullet } from 'src/components/Bullet/PlayerBullet';
import { Enemies } from 'src/components/Enemies/Enemies';
import Lobby from 'src/components/Lobby/Lobby';
import { Player } from 'src/components/Player/Player';
import { apiClient } from 'src/utils/apiClient';
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

    //衝突判定の距離
    const COLLISION_DISTANCE = 50;

    //敵と弾の衝突判定
    const checkCollisionBullet = async () => {
      const remainingEnemies = [];
      for (const enemy of enemies) {
        const hitBullet = playerBullets.find((bullet) => {
          const bulletPosition = posWithDirSpeTim(bullet, currentTime);
          const distanceSquared =
            Math.pow(enemy.createdPosition.x - bulletPosition[0], 2) +
            Math.pow(enemy.createdPosition.y - bulletPosition[1], 2);
          return distanceSquared < COLLISION_DISTANCE ** 2;
        });

        if (hitBullet && hitBullet.playerId) {
          await apiClient.enemy.$delete({
            body: {
              enemyId: enemy.id,
              userId: hitBullet.playerId,
            },
          });
          await apiClient.bullet.$delete({ body: { bulletId: hitBullet.id } });
        } else {
          remainingEnemies.push(enemy);
        }
      }
    };

    //敵とプレイヤーの衝突判定
    const checkCollisionPlayer = async () => {
      const remainingEnemies = [];

      for (const enemy of enemies) {
        const hitPlayer = players.find((player) => {
          const distanceSquared =
            Math.pow(enemy.createdPosition.x - player.position.x, 2) +
            Math.pow(enemy.createdPosition.y - player.position.y, 2);
          return distanceSquared < COLLISION_DISTANCE ** 2;
        });

        if (hitPlayer) {
          apiClient.game.$post({ body: { player: hitPlayer, enemy } });
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

    useEffect(() => {
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
            <Background />
          </Layer>
          <Layer>
            {playerBullets.map((bullet) => (
              <Bullet key={bullet.id} bullet={bullet} type={1} currentTime={currentTime} />
            ))}
          </Layer>
          <Layer>
            {enemyBullets.map((bullet) => (
              <Bullet key={bullet.id} bullet={bullet} type={0} currentTime={currentTime} />
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
