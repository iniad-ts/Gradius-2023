//ここにゲーム画面をつくる
import type { Enemy_Info } from '$/repository/Usecase/enemyUsecase';
import type { Laser_Info } from '$/repository/Usecase/laserUsecase';
import { useEffect, useState } from 'react';
import { Layer, Rect, Stage, Wedge } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
const App = () => {
  const [fight_position, setfight_position] = useState<number[]>();
  const [enemieies_info, setenemieies_info] = useState<Enemy_Info[]>([]);
  const [laseies_info, setlaseies_info] = useState<Laser_Info[]>([]);

  const fetchBord = async () => {
    const new_fighter_position = await apiClient.player.$get();
    const new_enemies_info = await apiClient.enemy.$get();
    const new_laseies_info = await apiClient.laser.$get();

    setfight_position(new_fighter_position);
    setenemieies_info(new_enemies_info);
    setlaseies_info(new_laseies_info);
  };

  useEffect(() => {
    const cancellid = setInterval(fetchBord, 10);
    return () => {
      clearInterval(cancellid);
    };
  }, []);
  if (!fight_position) return <Loading visible />;
  return (
    <Stage width={1100} height={750}>
      <Layer>
        <Wedge
          id="player"
          fill="red"
          angle={60}
          radius={70}
          rotation={150}
          x={fight_position[0]}
          y={fight_position[1]}
        />
        {enemieies_info.map((enemy, index) => (
          <Rect
            key={index}
            id={`enemy_${index}`}
            fill="black"
            width={40}
            height={40}
            x={enemy.pos.x}
            y={enemy.pos.y}
          />
        ))}
        {laseies_info.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="blue"
            width={20}
            height={20}
            x={laser.pos.x}
            y={laser.pos.y}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export default App;
