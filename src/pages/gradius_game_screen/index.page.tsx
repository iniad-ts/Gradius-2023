//ここにゲーム画面をつくる

import { useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

const App = () => {
  const [x_of_fighter, setx_of_fighter] = useState(0);
  const [y_of_fighter, sety_of_fighter] = useState(0);
  const fetchBord = async () => {
    const new_fighter_position = await apiClient.game_screen.$get();
    setx_of_fighter(new_fighter_position[0]);
    sety_of_fighter(new_fighter_position[1]);
  };
  useEffect(() => {
    const cancellid = setInterval(fetchBord, 100);
    return () => {
      clearInterval(cancellid);
    };
  }, []);
  if (!x_of_fighter || !y_of_fighter) return <Loading visible />;
  return (
    <Stage width={1100} height={690}>
      <Layer>
        <Rect fill="red" width={100} height={40} x={x_of_fighter} y={y_of_fighter} />
      </Layer>
    </Stage>
  );
};

export default App;
