import { useCallback, useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';

function App() {
  const [height, setHeight] = useState(0);

  const fetchBoard = useCallback(async () => {
    const a = await apiClient.rooms.boardgradius.$get().catch(returnNull);

    setHeight((prevHeight) => a ?? prevHeight);
  }, []);

  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 100);
    return () => {
      clearInterval(cancelID);
    };
  }, [fetchBoard]);

  return (
    <Stage width={500} height={800}>
      <Layer>
        <Rect stroke="block" fill="red" x={30} y={height} width={200} height={200} />
      </Layer>
    </Stage>
  );
}

export default App;
