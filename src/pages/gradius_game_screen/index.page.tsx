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
    const new_laser_pos = await apiClient.laser.$get();
    console.log(new_enemy_pos);
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
            key={index}
            id={`enemy_${index}`}
            fill="black"
            width={40}
            height={40}
            x={enemy[0]}
            y={enemy[1]}
          />
        ))}
        {/* {laser_pos.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="yellow"
            width={40}
            height={40}
            x={laser[0]}
            y={laser[1]}
          />
        ))} */}
      </Layer>
    </Stage>
  );
};
export default App;
