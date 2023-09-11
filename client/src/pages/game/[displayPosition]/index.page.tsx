/* eslint-disable max-lines */
import { ENEMY_HALF_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { Bullet } from 'src/components/Entity/Bullet';
import { Enemy } from 'src/components/Entity/Enemy';
import { Player } from 'src/components/Entity/Player';
import { Traffic } from 'src/components/traffic/traffic';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { computePosition } from 'src/utils/computePosition';
import useImage from 'use-image';
import styles from './index.module.css';

type WindowSize = {
  width: number;
  height: number;
};

const usePerformanceTimer = () => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const start = () => setStartTime(performance.now());

  const end = () => setEndTime(performance.now());
  return { startTime, endTime, start, end };
};

const usePerformanceTimer2 = () => {
  const [startTime2, setStartTime2] = useState(0);
  const [endTime2, setEndTime2] = useState(0);
  const start2 = () => setStartTime2(performance.now());

  const end2 = () => setEndTime2(performance.now());
  return { startTime2, endTime2, start2, end2 };
};
const usePerformanceTimer3 = () => {
  const [startTime3, setStartTime3] = useState(0);
  const [endTime3, setEndTime3] = useState(0);
  const start3 = () => setStartTime3(performance.now());

  const end3 = () => setEndTime3(performance.now());
  return { startTime3, endTime3, start3, end3 };
};
const usePerformanceTimer4 = () => {
  const [startTime4, setStartTime4] = useState(0);
  const [endTime4, setEndTime4] = useState(0);
  const start4 = () => setStartTime4(performance.now());

  const end4 = () => setEndTime4(performance.now());
  return { startTime4, endTime4, start4, end4 };
};
const usePerformanceTimer5 = () => {
  const [startTime5, setStartTime5] = useState(0);
  const [endTime5, setEndTime5] = useState(0);
  const start5 = () => setStartTime5(performance.now());

  const end5 = () => setEndTime5(performance.now());
  return { startTime5, endTime5, start5, end5 };
};

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
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { startTime, endTime, start, end } = usePerformanceTimer();
  const { startTime2, endTime2, start2, end2 } = usePerformanceTimer2();
  const { startTime3, endTime3, start3, end3 } = usePerformanceTimer3();
  const { startTime4, endTime4, start4, end4 } = usePerformanceTimer4();
  const { startTime5, endTime5, start5, end5 } = usePerformanceTimer5();

  const [backgroundImage] = useImage(staticPath.images.odaiba_jpg);

  const fetchPlayers = useCallback(async () => {
    start4();
    const res = await apiClient.player.$get({
      query: { displayNumber: Number(displayPosition) },
    });

    setPlayers(res);

    end4();
  }, [start4, end4, displayPosition]);

  const fetchEnemies = useCallback(async () => {
    start2();

    const res = await apiClient.enemy.$get();

    start3();

    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.id === enemy.id));
    if (killedEnemies.length > 0) {
      killedEnemies.forEach((enemy) => {
        const pos = computePosition(enemy.createdPos, enemy.createdAt, enemy.direction);
        setEffectPosition((prev) => [
          ...prev,
          [pos.x - ENEMY_HALF_WIDTH, pos.y - ENEMY_HALF_WIDTH],
        ]);
      });
    }

    end3();

    setEnemies(res);

    end2();
  }, [end2, start2, start3, end3, enemies]);

  const fetchBullets = useCallback(async () => {
    start5();

    const res = await apiClient.bullet.$get({
      query: { displayNumber: Number(displayPosition) },
    });
    if (res.length > bullets.length) {
      const audio = new Audio(staticPath.sounds.shot_mp3);
      audio.play();
    }

    setBullets(res);

    end5();
  }, [bullets.length, displayPosition, end5, start5]);

  useEffect(() => {
    start();

    const cancelId = requestAnimationFrame(async () => {
      await Promise.all([fetchPlayers(), fetchEnemies(), fetchBullets()]).then(() => end());
    });
    return () => cancelAnimationFrame(cancelId);
  }, [fetchBullets, fetchEnemies, fetchPlayers, end, start]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEffectPosition((prev) => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [effectPosition]);

  useEffect(() => {
    const set = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
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
      <Traffic traffic={endTime - startTime} left={0} length={20} text="BEとの通信" />
      <Traffic traffic={endTime4 - startTime4} left={200} length={20} text="fetch player" />
      <Traffic traffic={endTime5 - startTime5} left={400} length={20} text="fetch bullet" />
      <Traffic traffic={endTime2 - startTime2} left={600} length={20} text="fetch enemies" />
      <Traffic traffic={endTime3 - startTime3} left={800} length={20} text="爆発エフェクト計算" />
      <Stage
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={{
          transform: `
              scale(${windowSize.width / SCREEN_WIDTH}, ${windowSize.height / SCREEN_HEIGHT})
              translateX(${(windowSize.width - SCREEN_WIDTH) / 2}px)
              translateY(${(windowSize.height - SCREEN_HEIGHT) / 2}px)
              `,
        }}
      >
        <Layer>
          <Image
            image={backgroundImage}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            x={0}
            y={0}
            opacity={0.8}
          />
        </Layer>
        <Layer>
          {bullets.map((bullet) => (
            <Bullet displayPosition={displayPosition ?? 0} bullet={bullet} key={bullet.id} />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <Player displayPosition={displayPosition ?? 0} player={player} key={player.id} />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Enemy displayPosition={displayPosition ?? 0} enemy={enemy} key={enemy.id} />
          ))}
        </Layer>
        <Layer>
          {effectPosition.map((position, index) => (
            <Boom displayPosition={displayPosition ?? 0} position={position} key={index} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
