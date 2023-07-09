import type { Enemy } from '$/Usecase/enemyUsecase';
import type { Player } from '$/Usecase/playerUsecase';
import { useEffect, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

export const App = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const fetchPlayer = async (player: Player) => {
    const playerdata = await apiClient.player.$post({ body: player });
    setPlayerX(playerdata.PlayerPos.x);
    setPlayerY(playerdata.PlayerPos.y);
  };
  const [enemyX, setEnemyX] = useState(500);
  const [enemyY, setEnemyY] = useState(500);
  //apiに変更を送信して結果をsetしなおす関数
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
  useEffect(() => {
    const getEnemyPos = setInterval(fetchEnemy, 500);
    return () => {
      clearInterval(getEnemyPos);

    };
  });

  const [bulletX,setBulletX]=useState(playerX+100);
  const [bulletY,setBulletY]=useState(playerY);
  const fetchBullet=async()=>{
    const bulletData=await apiClient.player.shoot.$post({body:{PlayerPos: {x: playerX, y: playerY}, MoveInput:"none"}})
  }

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <>
      <Stage width={720} height={720} >
        <Layer>
          <Circle x={playerX} y={playerY} stroke="black" fill="blue" radius={50} />
          <Circle x={enemyX} y={enemyY} stroke="black" fill="red" radius={75} />
          <Circle x={bulletX} y={bulletY} stroke="black" fill="white"radius={10}/>
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
    </>
  );
};
