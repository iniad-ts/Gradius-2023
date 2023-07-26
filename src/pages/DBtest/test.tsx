import type { Bullet } from '$/Usecase/bulletUsecase';
import type { Enemy } from '$/Usecase/enemyUsecase';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';
export const DBDemoGame = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemyX, setEnemyX] = useState(500);
  const [enemyY, setEnemyY] = useState(300);
  const [enemys, setEnemys] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  //TODO jotaiでBulletの状態管理をする?

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
    const getEnemyPos = setInterval(fetchEnemy, 10000);
    return () => {
      clearInterval(getEnemyPos);
    };
  }, [enemyX, enemyY, enemys]);
  // const fetchBullet = async () => {
  //   const newBullet = await apiClient.player.shoot.$post({
  //     body: { PlayerPos: { x: players[0].x, y: players[0].y }, MoveInput: 'none' },
  //   });
  //   const newBullets = [...bullets, newBullet];
  //   setBullets(newBullets);
  // };

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
  useEffect(() => {
    const getPlayers = async () => {
      const playerData = await apiClient.game.player.$get();
      if (!playerData) return;

      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.map((player) => {
          if (player.id === playerData.id) {
            return { ...player, x: playerData.x, y: playerData.y };
          }
          return player;
        });

        if (!updatedPlayers.some((player) => player.id === playerData.id)) {
          return [...updatedPlayers, playerData];
        }

        return updatedPlayers;
      });
    };

    const getPlayerPos = setInterval(getPlayers, 10);

    return () => {
      clearInterval(getPlayerPos);
    };
  }, []);

  return (
    <>
      <Stage width={1000} height={1000} stroke="black">
        <Layer>
          {players.map((player, index) => (
            <Circle key={index} x={player.x} y={player.y} stroke="black" fill="blue" radius={100} />
          ))}
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
    </>
  );
};

export default DBDemoGame;
