<<<<<<< HEAD
import {
  BULLET_RADIUS,
  ENEMY_HALF_WIDTH,
  PLAYER_HALF_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { staticPath } from 'src/utils/$path';
=======
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
>>>>>>> upstream/develop
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Game = () => {
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const router = useRouter();

  const fetchDisplayNumber = useCallback(async () => {
    const res = await apiClient.config.$get();
    setDisplayNumber(res ?? 0);

<<<<<<< HEAD
  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.enemyId === enemy.enemyId));
    if (killedEnemies.length > 0) {
      killedEnemies.forEach((enemy) => {
        setEffectPosition((prev) => [
          ...prev,
          [enemy.pos.x - PLAYER_HALF_WIDTH, enemy.pos.y - PLAYER_HALF_WIDTH],
        ]);
      });
=======
    if (res === 0) {
      router.push('/config');
>>>>>>> upstream/develop
    }
  }, [router]);

  useEffect(() => {
    fetchDisplayNumber();
  }, [fetchDisplayNumber]);

  return (
<<<<<<< HEAD
    <div className={styles.canvasContainer}>
      <Stage
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
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
            <Circle
              x={bullet.pos.x}
              y={bullet.pos.y}
              radius={BULLET_RADIUS}
              fill="red"
              key={bullet.bulletId}
            />
          ))}
          {effectPosition.map((position, index) => (
            <Boom position={position} key={index} />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <Image
              image={playerImage}
              width={100}
              height={100}
              rotation={player.side === 'left' ? 90 : -90}
              x={player.pos.x - PLAYER_HALF_WIDTH}
              y={player.pos.y - PLAYER_HALF_WIDTH}
              key={player.userId}
            />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Image
              image={enemyImage1}
              width={80}
              height={80}
              x={enemy.pos.x - ENEMY_HALF_WIDTH}
              y={enemy.pos.y - ENEMY_HALF_WIDTH}
              key={enemy.enemyId}
            />
          ))}
        </Layer>
      </Stage>
=======
    <div className={styles.container}>
      <div>
        <p className={styles.text}>ディスプレイの位置を選択してください</p>
        <div className={styles.buttons}>
          {[...Array(displayNumber)].map((_, i) => (
            <button key={i} onClick={() => router.push(`/game/${i}`)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
>>>>>>> upstream/develop
    </div>
  );
};

export default Game;
