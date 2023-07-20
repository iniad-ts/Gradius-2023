import { useCallback, useEffect, useState } from 'react';
import { Layer, Rect, RegularPolygon, Stage, Text } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

function App() {
  const [position, setPosition] = useState([30, 300]);
  const [gunPosition, setGunPosition] = useState<number[][]>([]);

  const fetchBoard = useCallback(async () => {
    {
      const new_position = await apiClient.rooms.gradius.$get();
      const newGunPosition = await apiClient.rooms.gradius2.$get();
      setPosition(new_position);
      setGunPosition(newGunPosition);
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
    <Stage width={1500} height={800}>
      {/* ↓球 */}
      <Layer>
        {gunPosition.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="red"
            width={20}
            height={10}
            x={laser[0]}
            y={laser[1]}
          />
        ))}
      </Layer>
      {/* ↓飛行機 */}
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
      <Layer>
        <Text text={'Score:'} x={0} y={10} fontSize={30} width={500} fill="black" />
      </Layer>
    </Stage>
  );
}

export default App;
