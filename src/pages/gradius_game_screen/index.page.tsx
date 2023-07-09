//ここにゲーム画面をつくる
import { useEffect, useState } from 'react';
import { Layer, Rect, Stage, Wedge } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
const App = () => {
  const [fight_position, setfight_position] = useState([0, 0]);

  const fetchBord = async () => {
    const new_fighter_position = await apiClient.game_screen.$get();
    setfight_position(new_fighter_position);
  };
  useEffect(() => {
    const cancellid = setInterval(fetchBord, 100);
    return () => {
      clearInterval(cancellid);
    };
  }, []);
  if (!fight_position) return <Loading visible />;
  return (
    <Stage width={1100} height={690}>
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
        <Rect id="enemy" fill="black" width={40} height={40} x={400} y={100} />
      </Layer>
    </Stage>
  );
};
export default App;
