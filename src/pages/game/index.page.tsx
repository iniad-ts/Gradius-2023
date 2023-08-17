import { useEffect, useState } from 'react';
import { Layer, Stage, Wedge } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

const Game = () => {
  const [position, setPosition] = useState({ x: 100, y: 350 });
  const fetchPosition = async () => {
    const res = await apiClient.player.$get();
    if (res) {
      setPosition(res);
    }
  };
  useEffect(() => {
    const cancelId = setInterval(() => {
      fetchPosition();
    }, 100);
    return () => clearInterval(cancelId);
  });

  return (
    <div>
      <Stage width={1000} height={700}>
        <Layer>
          <Wedge angle={60} fill="red" radius={70} rotation={150} x={position.x} y={position.y} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
