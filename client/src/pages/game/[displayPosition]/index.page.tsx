import { ENEMY_HALF_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image, Layer, Stage, Text } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { Bullet } from 'src/components/Entity/Bullet';
import { Enemy } from 'src/components/Entity/Enemy';
import { Player } from 'src/components/Entity/Player';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { computePosition } from 'src/utils/computePosition';
import useImage from 'use-image';
import styles from './index.module.css';

type WindowSize = {
  width: number;
  height: number;
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
  console.log(displayPosition);

  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);
  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [effectPosition, setEffectPosition] = useState<number[][]>([]);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [backgroundImage] = useImage(staticPath.images.odaiba_jpg);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get({
      query: { displayNumber: Number(displayPosition) },
    });
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
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
            <Bullet displayPosition={displayPosition ?? 0} bullet={bullet} key={bullet.id} />
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
