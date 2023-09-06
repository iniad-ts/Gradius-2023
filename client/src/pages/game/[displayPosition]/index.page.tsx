import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { Bullet } from 'src/components/Entity/Bullet';
import { Enemy } from 'src/components/Entity/Enemy';
import { Player } from 'src/components/Entity/Player';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Game = () => {
  const router = useRouter();
  let displayPosition: number | null = null;
  if (typeof router.query.displayPosition === 'string') {
    const parsed = Number(router.query.displayPosition);
    if (!isNaN(parsed)) {
      displayPosition = parsed;
    }
  }

  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);
  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [effectPosition, setEffectPosition] = useState<number[][]>([]);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get({
      query: { displayNumber: Number(displayPosition) },
    });
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.enemyId === enemy.enemyId));
    if (killedEnemies.length > 0) {
      killedEnemies.forEach((enemy) => {
        setEffectPosition((prev) => [...prev, [enemy.pos.x - 40, enemy.pos.y - 40]]);
      });
    }
    setEnemies(res);
  };

  const fetchBullets = async () => {
    const res = await apiClient.bullet.$get();
    if (res.length > bullets.length) {
      const audio = new Audio(staticPath.sounds.shot_mp3);
      audio.play();
    }
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEffectPosition((prev) => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [effectPosition]);

  useEffect(() => {
    const setWindowSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    setWindowSize();
    window.addEventListener('resize', setWindowSize);
    return () => window.removeEventListener('resize', setWindowSize);
  }, []);

  useEffect(() => {
    const redirectToLobby = async () => {
      const res = await apiClient.config.$get();
      if (Number(displayPosition) >= (res ?? 1)) {
        router.push('/game');
      }
    };
    redirectToLobby();
  }, [router, displayPosition]);

  return (
    <div className={styles.canvasContainer}>
      <Stage
        width={1920}
        height={1080}
        style={{
          transform: `
              scale(${width / 1920}, ${height / 1080})
              translateX(${(width - 1920) / 2}px)
              translateY(${(height - 1080) / 2}px)
              `,
        }}
      >
        <Layer>
          {bullets.map((bullet) => (
            <Bullet displayPosition={displayPosition ?? 0} bullet={bullet} key={bullet.bulletId} />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <Player displayPosition={displayPosition ?? 0} player={player} key={player.userId} />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Enemy displayPosition={displayPosition ?? 0} enemy={enemy} key={enemy.enemyId} />
          ))}
        </Layer>
        <Layer>
          {effectPosition.map((position, index) => (
            <Boom position={position} key={index} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
