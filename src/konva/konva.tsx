import { useCallback, useEffect, useState } from 'react';
import { Layer, Rect, RegularPolygon, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

function App() {
  const [position, setPosition] = useState([30, 300]);
  const [ok, setOk] = useState(false);
  const [count, setCount] = useState(0);

  const fetchBoard = useCallback(async () => {
    {
      const new_position = await apiClient.rooms.gradius.$get();
      const new_ok = await apiClient.rooms.gradius2.$get();
      setPosition(new_position);
      setOk(new_ok);
    }
  }, []);

  //0.5秒ごとに球を20進める
  useEffect(() => {
    const interval = setInterval(() => {
      if (ok) {
        setCount((prevCount) => prevCount + 20);
      } else {
        setCount(0);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [ok]);

  //100ミリ秒ごとに飛行機の位置情報を取りに行く
  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 100);
    return () => {
      clearInterval(cancelID);
    };
  }, [fetchBoard]);

  return (
    <Stage width={500} height={800}>
      {/* ↓球 */}
      <Layer>
        {ok && (
          <Rect
            stroke="black"
            fill="red"
            x={position[0] + 50 + count}
            y={position[1] - 5}
            width={30}
            height={10}
          />
        )}
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
    </Stage>
  );
}

export default App;
