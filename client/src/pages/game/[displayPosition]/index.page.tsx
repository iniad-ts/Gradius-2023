import {
  DISPLAY_COUNT,
  ENEMY_HALF_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'commonConstantsWithClient';
import type {
  BulletModelWithPos,
  EnemyModelWithPos,
  PlayerModel,
} from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image, Layer, Stage, Text } from 'react-konva';
import Bomb from 'src/components/Effect/Bomb';
import { Bullet } from 'src/components/Entity/Bullet';
import { Enemy } from 'src/components/Entity/Enemy';
import { Player } from 'src/components/Entity/Player';
import type { Pos, WindowSize } from 'src/types/types';
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

  //ANCHOR - state
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModelWithPos[]>([]);
  const [bullets, setBullets] = useState<BulletModelWithPos[]>([]);

  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [BombEffectPosition, setBombEffectPosition] = useState<Pos[][]>([[]]);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [backgroundImage] = useImage(staticPath.images.space_background_8bit_jpg);

  const fetchEntities = async () => {
    const res = await apiClient.entity.$get({
      query: { displayNumber: Number(displayPosition) },
    });

    const currentEnemyIds = new Set(res.enemies.map((e) => e.id));
    const killedEnemies = enemies.filter(
      (enemy) =>
        !currentEnemyIds.has(enemy.id) &&
        (enemy.pos.x > 1920 * (displayPosition ?? 0) ||
          enemy.pos.x < 1920 * ((displayPosition ?? 0) + 1))
    );

    const newEffectPosition = killedEnemies.map((enemy) => {
      return { x: enemy.pos.x - ENEMY_HALF_WIDTH, y: enemy.pos.y - ENEMY_HALF_WIDTH };
    });

    setBombEffectPosition((prev) => [...prev.slice(-10), newEffectPosition]);

    setPlayers(res.players);
    setEnemies(res.enemies);
    setBullets(res.bullets);
  };

  //ANCHOR - effect
  useEffect(() => {
    const cancelId = requestAnimationFrame(async () => {
      await fetchEntities();
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
      if (Number(displayPosition) >= DISPLAY_COUNT) {
        router.push('/game');
      }
    };
    redirectToLobby();
  }, [router, displayPosition]);

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
            <Bullet displayPosition={displayPosition ?? 0} bullet={bullet} key={bullet.id} />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <React.Fragment key={player.id}>
              <Text
                x={player.pos.x - SCREEN_WIDTH * (displayPosition ?? 0)}
                y={player.pos.y - 80}
                text={player.name.slice(0, 8)}
                fontSize={30}
                fill={'white'}
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
          {BombEffectPosition.flat().map((position, index) => (
            <Bomb displayPosition={displayPosition ?? 0} position={position} key={index} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
