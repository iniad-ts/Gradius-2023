import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import type { BulletModelWithPosition } from '$/usecase/bulletUseCase';
import { useState } from 'react';
import { Layer, Stage } from 'react-konva';

const Game = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModelWithPosition[]>([]);

  // const fetchPosition = async () => {
  //   const res = await apiClient.player.$get();
  //   if (res !== null) {
  //     setmyPosition(res);
  //   }
  // };
  // const fetchbulletPosition = async () => {
  //   const res = await apiClient.player.bullet.$get();
  //   if (res !== null) {
  //     setbulletPosition(res);
  //   }
  // };
  // useEffect(() => {
  //   const cancelId = requestAnimationFrame(() => {
  //     console.log('fetch');
  //     fetchPosition();
  //     fetchbulletPosition();
  //   });
  //   return () => cancelAnimationFrame(cancelId);
  // });

  return (
    <div>
      <Stage width={1000} height={700}>
        <Layer>
          {/* mapで回す */}

          {/* <Wedge
            fill="red"
            angle={60}
            radius={70}
            rotation={150}
            x={myPosition.x}
            y={myPosition.y}
          /> */}
        </Layer>
        <Layer>
          {/* {bulletPosition.map((bullet) => (
            <Circle
              fill="red"
              radius={bullet.radius}
              x={bullet.position.x}
              y={bullet.position.y}
              key={bullet.id}
            />
          ))} */}
        </Layer>
        <Layer>
          {/* mapで回す */}

          {/* <Circle fill="blue" x={enemyPosition.x} y={enemyPosition.y} radius={} /> */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
