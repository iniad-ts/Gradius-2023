import type { Bullet } from '$/Usecase/bulletUsecase';
import type { Enemy } from '$/Usecase/enemyUsecase';
import type { Player } from '$/Usecase/playerUsecase';
import { useEffect, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';
export const App = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(300);
  const [enemyX, setEnemyX] = useState(500);
  const [enemyY, setEnemyY] = useState(300);
  const [enemys, setEnemys] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const fetchPlayer = async (player: Player) => {
    const playerdata = await apiClient.player.$post({ body: player });
    setPlayerX(playerdata.PlayerPos.x);
    setPlayerY(playerdata.PlayerPos.y);
  };

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
        radius: 75,
      };
      const enemyData = await apiClient.enemy.$post({ body: enemy });
      setEnemyX(enemyData.EnemyPos.x);
      setEnemyY(enemyData.EnemyPos.y);
      const newEnemys = [...enemys, enemy];
      setEnemys(newEnemys);
    };
    const getEnemyPos = setInterval(fetchEnemy, 2500);
    return () => {
      clearInterval(getEnemyPos);
    };
  }, [enemyX, enemyY, enemys]);
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
    const getBulletPos = requestAnimationFrame(moveBullet);
    return () => {
      cancelAnimationFrame(getBulletPos);
    };
  }, [bullets]);

  useEffect(() => {
    function detectCollision(Bullets: Bullet[], Enemys: Enemy[]) {
      for (let i = 0; i < Bullets.length; i++) {
        for (let j = 0; j < Enemys.length; j++) {
          const dx = Bullets[i].x - Enemys[j].EnemyPos.x;
          const dy = Bullets[i].y - Enemys[j].EnemyPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < Bullets[i].radius + Enemys[j].radius - 10) {
            //衝突した2つの円を除いた配列を返す
            Bullets.splice(i, 1);
            Enemys.splice(j, 1);
            console.log('hit', Bullets.splice(i, 1), Enemys.splice(j, 1));
            // const deleteEnemy = Enemys[j];
            // //ここにAPI叩いて敵をDBから消す処理を書く
            return { Bullets, Enemys };
          }
        }
      }
      return { Bullets, Enemys };
    }
    const test = detectCollision(bullets, enemys);
    setBullets(test.Bullets);
    setEnemys(test.Enemys);
  }, [bullets, enemys]);

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <>
      <Stage width={1000} height={1000} stroke="black">
        <Layer>
          <Circle x={playerX} y={playerY} stroke="black" fill="blue" radius={50} />
          {enemys.map((enemy, index) => (
            <Circle
              key={index}
              x={enemy.EnemyPos.x}
              y={enemy.EnemyPos.y}
              stroke="black"
              fill="red"
              radius={enemy.radius}
            />
          ))}
          {bullets.map((bullet, index) => (
            <Circle
              key={index}
              x={bullet.x}
              y={bullet.y}
              stroke="black"
              fill="green"
              radius={bullet.radius}
            />
          ))}
        </Layer>
      </Stage>
      <div className={styles.board}>
        <div className={styles.container}>
          <div className={styles.button} />
          <div
            className={`${styles.button} ${styles.up}`}
            onClick={() => {
              const player: Player = {
                PlayerPos: { x: playerX, y: playerY },
                MoveInput: 'up',
              };
              fetchPlayer(player);
              console.log(playerY);
            }}
          />
          <div className={styles.button} />
          <div
            className={`${styles.button} ${styles.left}`}
            onClick={() => {
              const player: Player = {
                PlayerPos: { x: playerX, y: playerY },
                MoveInput: 'left',
              };
              fetchPlayer(player);
              console.log(playerY);
            }}
          />
          <div className={styles.button}>〇</div>
          <div
            className={`${styles.button} ${styles.right}`}
            onClick={() => {
              const player: Player = {
                PlayerPos: { x: playerX, y: playerY },
                MoveInput: 'right',
              };
              fetchPlayer(player);
              console.log(playerY);
            }}
          />
          <div className={styles.button} />
          <div
            className={`${styles.button} ${styles.down}`}
            onClick={() => {
              const player: Player = {
                PlayerPos: { x: playerX, y: playerY },
                MoveInput: 'down',
              };
              fetchPlayer(player);
              console.log(playerY);
            }}
          />
          <div className={styles.button} />
        </div>
        <div
          className={styles.shoot}
          onClick={() => {
            fetchBullet();
            console.log(playerY);
          }}
        >
          shoot
        </div>
      </div>
    </>
  );
};
