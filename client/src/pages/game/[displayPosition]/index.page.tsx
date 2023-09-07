import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';
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
  const [playerImage] = useImage(staticPath.images.spaceship_png);
  const [enemyImage1] = useImage(staticPath.images.ufo_jpg);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const SCREEN_WIDTH = 1920;

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get({
      query: { displayNumber: Number(displayPosition) },
    });
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    const display = Number(displayPosition);
    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.enemyId === enemy.enemyId));
    if (killedEnemies.length > 0) {
      killedEnemies.forEach((enemy) => {
        setEffectPosition((prev) => [
          ...prev,
          [enemy.pos.x - 1920 * display - 40, enemy.pos.y - 40],
        ]);
      });
    }
    setEnemies(res);
  };

  const fetchBullets = async () => {
    const res = await apiClient.bullet.$get({
      query: { displayNumber: Number(displayPosition) },
    });
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
          {bullets.map(
            (bullet) =>
              displayPosition !== null && (
                <Circle
                  x={bullet.pos.x - SCREEN_WIDTH * displayPosition}
                  y={bullet.pos.y}
                  radius={7}
                  fill="red"
                  key={bullet.bulletId}
                />
              )
          )}
        </Layer>
        <Layer>
          {players.map(
            (player) =>
              displayPosition !== null && (
                <Image
                  image={playerImage}
                  width={100}
                  height={100}
                  rotation={player.side === 'left' ? 90 : -90}
                  x={player.pos.x - SCREEN_WIDTH * displayPosition + 50}
                  y={player.pos.y - 50}
                  key={player.userId}
                />
              )
          )}
        </Layer>
        <Layer>
          {enemies.map(
            (enemy) =>
              displayPosition !== null && (
                <Image
                  image={enemyImage1}
                  width={80}
                  height={80}
                  x={enemy.pos.x - SCREEN_WIDTH * displayPosition - 40}
                  y={enemy.pos.y - 40}
                  key={enemy.enemyId}
                />
              )
          )}
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
