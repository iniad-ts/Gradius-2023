import { useCallback, useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

function App() {
  const windowWidth = Number(window.innerWidth);
  const windowHeight = Number(window.innerHeight);
  //プレイヤーと銃の位置をstateで管理
  const [newPlayerPosition, setNewPlayerPosition] = useState<number[][]>([]);
  const [newGunPosition, setNewGunPosition] = useState<number[][]>([]);
  //apiを叩いてプレイヤーと銃の位置を取得stateにセット
  const getPosition = useCallback(async () => {
    {
      const new_position = await apiClient.rooms.playerPosition.$get();
      const new_gunPosition = await apiClient.rooms.gunPosition.$get();
      setPosition(new_position);
      setGunPosition(new_gunPosition);
    }
  }, []);

  useEffect(() => {
    const cancelId = setInterval(getPosition, 5);
    return () => {
      clearInterval(cancelId);
    };
  }, [getPosition]);

  return (
    <Stage width={1500} height={800}>
      <Layer>
        <Rect fill="red" width={175} height={75} x={position[0]} y={position[1]} />
      </Layer>
    </Stage>
  );
}

export default App;
