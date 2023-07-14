import { useCallback, useEffect, useState } from 'react';
import { Layer, RegularPolygon, Stage } from 'react-konva';
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
        <RegularPolygon
          sides={3}
          radius={50}
          stroke="black"
          fill="green"
          x={position[0]}
          y={position[1]}
          width={100}
          height={100}
          rotation={90}
          strokeWidth={1}
        />
      </Layer>
    </Stage>
  );
}

export default App;
