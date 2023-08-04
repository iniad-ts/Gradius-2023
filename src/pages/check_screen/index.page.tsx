//ここにゲーム画面をつくる
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
const App = () => {
  // const [fight_position, setfight_position] = useState([0, 0]);
  const [enemies, setenemies] = useState<EnemyModel[]>();
  const fetchBord = async () => {
    // const new_fighter_position = await apiClient.game_screen.$get();
    const new_enemy_pos = await apiClient.check.$get();
    console.log(new_enemy_pos);
    // setfight_position(new_fighter_position);
    setenemies(new_enemy_pos);
  };
  useEffect(() => {
    const cancellid = setInterval(fetchBord, 100);
    return () => {
      clearInterval(cancellid);
    };
  }, []);
  if (!enemies) return <Loading visible />;
  return (
    <Stage width={1800} height={900}>
      <Layer>
        {enemies.map((enemy, index) => (
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
      </Layer>
    </Stage>
  );
};
export default App;
