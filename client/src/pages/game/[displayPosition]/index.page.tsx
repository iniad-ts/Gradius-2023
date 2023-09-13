import { ENEMY_HALF_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image, Layer, Stage, Text } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { Bullet } from 'src/components/Entity/Bullet';
import { Enemy } from 'src/components/Entity/Enemy';
import { Player } from 'src/components/Entity/Player';
import type { Pos, WindowSize } from 'src/types/types';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { computePosition } from 'src/utils/computePosition';
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

  //ANCHOR - state
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);

  const [timeDiffFix, setTimeDiffFix] = useState<number>();

  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [effectPosition, setEffectPosition] = useState<Pos[][]>([[]]);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [backgroundImage] = useImage(staticPath.images.odaiba_jpg);

  //ANCHOR - fetch
  const fetchPlayers = async () => {
    const res = await apiClient.player.$get({
      query: { displayNumber: Number(displayPosition) },
    });
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.id === enemy.id));

    const newEffectPosition = killedEnemies.map((enemy) => {
      const pos = computePosition(
        enemy.createdPos,
        enemy.createdAt,
        enemy.direction,
        timeDiffFix ?? 0
      );
      return { x: pos.x - ENEMY_HALF_WIDTH, y: pos.y - ENEMY_HALF_WIDTH };
    });
    setEffectPosition((prev) => [...prev.slice(-10), newEffectPosition]);

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

  const fetchDiff = async () => {
    const frontTIme = Date.now();

    const res = await apiClient.diff.$get();

    setTimeDiffFix(res - frontTIme);
  };

  //ANCHOR - effect
  useEffect(() => {
    const cancelId = requestAnimationFrame(async () => {
      await Promise.all([fetchPlayers(), fetchEnemies(), fetchBullets()]);
    });
    return () => cancelAnimationFrame(cancelId);
  });

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

  useEffect(() => {
    fetchDiff();
  });

  //ANCHOR - return
  return (
    <div className={styles.canvasContainer}>
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
            <Bullet
              displayPosition={displayPosition ?? 0}
              bullet={bullet}
              timeDiffFix={timeDiffFix ?? 0}
              key={bullet.id}
            />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <React.Fragment key={player.id}>
              <Text
                x={player.pos.x - SCREEN_WIDTH * (displayPosition ?? 0)}
                y={player.pos.y - 80}
                text={player.name}
                fontSize={30}
              />
              <Player displayPosition={displayPosition ?? 0} player={player} />
            </React.Fragment>
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Enemy
              displayPosition={displayPosition ?? 0}
              enemy={enemy}
              timeDiffFix={timeDiffFix ?? 0}
              key={enemy.id}
            />
          ))}
        </Layer>
        <Layer>
          {effectPosition.flat().map((position, index) => (
            <Boom displayPosition={displayPosition ?? 0} position={position} key={index} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
