//ここにゲーム画面をつくる
import { useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
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
        <Rect fill="red" width={100} height={40} x={fight_position[0]} y={fight_position[1]} />
      </Layer>
    </Stage>
  );
};
export default App;
