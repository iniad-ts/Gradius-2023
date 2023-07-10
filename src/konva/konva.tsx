import { useCallback, useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

function App() {
  const [position, setPosition] = useState([30, 300]);

  const fetchBoard = useCallback(async () => {
    {
      const new_position = await apiClient.rooms.gradius.$get();
      setPosition(new_position);
    }
  }, []);

  //100ミリ秒ごとに飛行機の位置情報を取りに行く
  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 100);
    return () => {
      clearInterval(cancelID);
    };
  }, [fetchBoard]);

  return (
    <Stage width={500} height={800}>
      <Layer>
        <Rect stroke="block" fill="red" x={position[0]} y={position[1]} width={200} height={200} />
      </Layer>
    </Stage>
  );
}

export default App;
