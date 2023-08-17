import type { EnemyModel } from '$/commonTypesWithClient/models';
import { useCallback, useEffect, useState } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

function App() {
  const windowWidth = Number(window.innerWidth);
  const windowHeight = Number(window.innerHeight);
  //プレイヤーと銃の位置をstateで管理
  const [newPlayerPosition, setNewPlayerPosition] = useState<number[][]>([]);
  const [newGunPosition, setNewGunPosition] = useState<number[][]>([]);
  const [newEnemyPosition, setNewEnemyPosition] = useState<EnemyModel[]>([]);
  //apiを叩いてプレイヤーと銃の位置を取得stateにセット
  const getPosition = useCallback(async () => {
    const new_playerPosition = await apiClient.rooms.control.$get();
    const new_gunPosition = await apiClient.rooms.gunPosition.$get();
    const new_enemyPosition = await apiClient.check.$get();
    console.log(new_playerPosition);
    console.log(new_gunPosition);
    console.log(new_enemyPosition);
    setNewPlayerPosition(new_playerPosition);
    setNewGunPosition(new_gunPosition);
    setNewEnemyPosition(new_enemyPosition);
  }, []);

  //apiを叩く処理を100msごとに実行
  useEffect(() => {
    const cancelId = setInterval(getPosition, 100);

    return () => {
      clearInterval(cancelId);
    };
  }, [getPosition, newPlayerPosition]);
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
          <Rect key={index} x={player[0]} y={player[1]} width={50} height={50} fill="red" />
        ))}
        {newGunPosition.map((gun, index) => (
          <Circle key={index} radius={10} x={gun[0]} y={gun[1]} fill="green" />
        ))}
        {newEnemyPosition.map((enemy, index) => (
          <Rect key={index} x={enemy.pos.x} y={enemy.pos.y} width={50} height={50} fill="blue" />
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
