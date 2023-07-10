import type { Bullet } from '$/usecase/bulletUseCase';
import { useEffect, useState } from 'react';
import { Circle, Layer, Rect, Stage, Wedge } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

const Game = () => {
  const [myPosition, setmyPosition] = useState({ x: 100, y: 350 });
  const [enemyPosition, setenemyPosition] = useState({ x: 900, y: 350 });
  const [bulletPosition, setbulletPosition] = useState<Bullet[]>([]);
  const fetchPosition = async () => {
    const res = await apiClient.player.$get();
    if (res) {
      setmyPosition(res);
    }
  };
  const fetchbulletPosition = async () => {
    const res = await apiClient.player.bullet.$get();
    if (res) {
      setbulletPosition(res);
    }
  };
  useEffect(() => {
    const cancelId = setInterval(() => {
      console.log('fetch');
      fetchPosition();
      fetchbulletPosition();
    }, 100);
    return () => clearInterval(cancelId);
  });

  return (
    <div>
      <Stage width={1000} height={700}>
        <Layer>
          <Wedge
            fill="red"
            angle={60}
            radius={70}
            rotation={150}
            x={myPosition.x}
            y={myPosition.y}
          />
        </Layer>
        <Layer>
          {bulletPosition.map((bullet) => (
            <Circle
              fill="red"
              radius={bullet.radius}
              x={bullet.position.x}
              y={bullet.position.y}
              key={bullet.position.x + bullet.position.y}
            />
          ))}
        </Layer>
        <Layer>
          <Rect fill="blue" x={enemyPosition.x} y={enemyPosition.y} width={40} height={40} />
        </Layer>
        <Layer>
          <Circle fill="blue" radius={7} x={enemyPosition.x - 100} y={enemyPosition.y} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
