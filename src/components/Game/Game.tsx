import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import React, { useCallback, useEffect, useState } from 'react';
import { Circle, Layer, Rect, Stage, Text } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

const Game = ({ monitorId }: { monitorId: number }) => {
  const windowWidth = Number(window.innerWidth);
  const windowHeight = Number(window.innerHeight);

  //プレイヤーと弾敵をstateで管理
  const [newPlayerPosition, setNewPlayerPosition] = useState<PlayerModel[]>([]);
  const [newGunPosition, setNewGunPosition] = useState<number[][]>([]);
  const [newEnemyPosition, setNewEnemyPosition] = useState<EnemyModel[]>([]);
  //apiを叩いてプレイヤーと銃敵の位置を取得stateにセット
  const getPosition = useCallback(async () => {
    const new_playerPosition = await apiClient.rooms.control.$get();
    const new_gunPosition = await apiClient.rooms.gunPosition.$get();
    const new_enemyPosition = await apiClient.check.$get();

    ///当たり判定を行う
    checkCollision(new_enemyPosition, new_gunPosition);
    // checkCollision(new_enemyPosition, new_playerPosition);//一次的にコメントアウトしています。

    setNewPlayerPosition(new_playerPosition);
    setNewGunPosition(new_gunPosition);
    setNewEnemyPosition(new_enemyPosition);
  }, []);
  //仮の当たり判定関数
  const checkCollision = (hitlist1: EnemyModel[], hitlist2: number[][]) => {
    const list2Radius = 20; // list2 の固定の半径

    hitlist1.map((list1) => {
      hitlist2.map((list2: number[]) => {
        const distance1to2 = Math.sqrt(
          (list1.pos.x - list2[0]) ** 2 + (list1.pos.y - list2[1]) ** 2
        );
        if (distance1to2 < list1.radius + list2Radius) {
          apiClient.check.$post({ body: list1.id });
          console.log('フロントhit', list1.id);
        }
      });
    });
  };
  //配列用の当たり判定関数

  /* const checkCollision = (hitlist1: EnemyModel[], hitlist2: EnemyModel[]) => {
    hitlist1.map((list1) => {
      hitlist2.map((list2) => {
        const distance1to2 = Math.sqrt(
          (list1.pos.x - list2.pos.x) ** 2 + (list1.pos.y - list2.pos.y) ** 2
        );
        if (distance1to2 < list1.radius + list2.radius) {
          console.log('hit');
          apiClient.check.$post({ body: list1.id });
        }
      });
    });
  }; */

  //apiを叩く処理を100msごとに実行
  useEffect(() => {
    const cancelId = setInterval(getPosition, 50);

    return () => {
      clearInterval(cancelId);
    };
  }, [getPosition]);
  //mapで展開してひとつずつ描画
  return (
    <Stage width={windowWidth} height={windowHeight}>
      <Layer>
        <Rect
          stroke={'black'}
          strokeWidth={1}
          x={0}
          y={0}
          width={windowWidth}
          height={windowHeight}
        />

        {newPlayerPosition.map((player, index) => (
          <>
            <Circle
              key={index}
              x={player.pos.x - monitorId * windowWidth}
              y={player.pos.y}
              width={50}
              height={50}
              fill="red"
            />
            <Text
              x={player.pos.x - monitorId * windowWidth - 23}
              y={player.pos.y - 45}
              fontSize={15}
              fontFamily="Arial"
              fill="black"
              text={player.name}
            />
          </>
        ))}
        {newGunPosition.map((gun, index) => (
          <Circle
            key={index}
            radius={10}
            x={gun[0] - monitorId * windowWidth}
            y={gun[1]}
            fill="green"
          />
        ))}
        {newEnemyPosition.map((enemy, index) => (
          <React.Fragment key={index}>
            <Circle
              key={index}
              x={enemy.pos.x - monitorId * windowWidth}
              y={enemy.pos.y - monitorId * windowWidth}
              width={50}
              height={50}
              fill="blue"
            />
            <Text
              x={enemy.pos.x - monitorId * windowWidth}
              y={enemy.pos.y}
              fontSize={15}
              fontFamily="Arial"
              cc
              text={enemy.type.toString()}
            />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

export default Game;
