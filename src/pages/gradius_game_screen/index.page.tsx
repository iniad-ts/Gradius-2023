//ここにゲーム画面をつくる
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
// import enemy01 from '../../../public/images/enemy01.png';
// import fighter from '../../../public/images/fighter.png';

const App = () => {
  const [fight_position, setfight_position] = useState([0, 0]);
  const [enemies, setenemies] = useState<number[][]>([]);
  const fetchBord = async () => {
    const new_fighter_position = await apiClient.game_screen.$get();
    const new_enemy_pos = await apiClient.enemy.$get();
    setfight_position(new_fighter_position);
    setenemies(new_enemy_pos);
  };
  useEffect(() => {
    const cancellid = setInterval(fetchBord, 100);
    return () => {
      clearInterval(cancellid);
    };
  }, []);
  if (!fight_position) return <Loading visible />;
  return (
    <>
      <Stage width={1100} height={690}>
        <Layer>
          <Rect
            id="player"
            stroke="black"
            strokeWidth={1}
            x={fight_position[0]}
            y={fight_position[1]}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export default App;
