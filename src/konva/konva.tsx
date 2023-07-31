import { useCallback, useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

function App() {
  //プレイヤーの位置
  const [position, setPosition] = useState([30, 300]);
  const [gunPosition, setGunPosition] = useState<number[][]>([]);

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
