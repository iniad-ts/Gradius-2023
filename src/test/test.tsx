import type { Bullet } from '$/Usecase/bulletUsecase';
import type { Enemy } from '$/Usecase/enemyUsecase';
import type { Player } from '$/Usecase/playerUsecase';
import { useEffect, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

export const App = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(300);
  const fetchPlayer = async (player: Player) => {
    const playerdata = await apiClient.player.$post({ body: player });
    setPlayerX(playerdata.PlayerPos.x);
    setPlayerY(playerdata.PlayerPos.y);
  };
  const [enemyX, setEnemyX] = useState(500);
  const [enemyY, setEnemyY] = useState(300);
  //apiに変更を送信して結果をsetしなおす関数

  useEffect(() => {
    const fetchEnemy = async () => {
      //playerの際にボタンを押したタイミングでplayerオブジェクトを生成していましたが、エネミーではそれがないため、えらーだったみたいです。
      //そのため、以下でememyを定義することによりAPIアクセス時のえらーを修正しました。
      const enemy: Enemy = {
        EnemyPos: {
          x: enemyX,
          y: enemyY,
        },
      };
      const enemyData = await apiClient.enemy.$post({ body: enemy });
      setEnemyX(enemyData.EnemyPos.x);
      setEnemyY(enemyData.EnemyPos.y);
    };
    const getEnemyPos = setInterval(fetchEnemy, 500);
    return () => {
      clearInterval(getEnemyPos);
    };
  }, [enemyX, enemyY]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const fetchBullet = async () => {
    const newBullet = await apiClient.player.shoot.$post({
      body: { PlayerPos: { x: playerX, y: playerY }, MoveInput: 'none' },
    });
    const newBullets = [...bullets, newBullet];
    setBullets(newBullets);
  };

  useEffect(() => {
    const moveBullet = () => {
      const newBullets = bullets.map((bullet) => ({ ...bullet, x: bullet.x + bullet.speed }));
      setBullets(newBullets);
    };
    const getBulletPos = setInterval(moveBullet, 10);
    return () => {
      clearInterval(getBulletPos);
    };
  }, [bullets]);

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <>
      <Stage width={720} height={720} stroke="black">
        <Layer>
          <Circle x={playerX} y={playerY} stroke="black" fill="blue" radius={50} />
          <Circle x={enemyX} y={enemyY} stroke="black" fill="red" radius={75} />
          {bullets.map((bullet) => (
            <Circle
              key={bullet.x}
              x={bullet.x}
              y={bullet.y}
              stroke="black"
              fill="green"
              radius={bullet.radius}
            />
          ))}
        </Layer>
      </Stage>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'down',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        down
      </button>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'up',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        up
      </button>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'left',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'right',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        right
      </button>
      <button
        onClick={() => {
          fetchBullet();
          console.log(playerY);
        }}
      >
        shoot
      </button>
    </>
  );
};
