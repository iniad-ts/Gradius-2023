import { BULLET_RADIUS, SCREEN_HEIGHT, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import Boom from 'src/components/Effect/Boom';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';

const Game = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);
  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [effectPositon, setEffectPosition] = useState<number[][]>([]);
  const [playerImage] = useImage(staticPath.images.spaceship_png);
  const [enemyImage1] = useImage(staticPath.images.ufo_jpg);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.enemyId === enemy.enemyId));
    if (killedEnemies.length > 0) {
      killedEnemies.forEach((enemy) => {
        setEffectPosition((prev) => [...prev, [enemy.pos.x, enemy.pos.y]]);
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
    setTimeout(() => {
      setEffectPosition((prev) => prev.slice(1));
    }, 1000);
  }, [effectPositon]);

  return (
    <div>
      <Stage width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
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
          {effectPositon.map((position, index) => (
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
              x={player.pos.x}
              y={player.pos.y}
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
              x={enemy.pos.x}
              y={enemy.pos.y}
              key={enemy.enemyId}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
