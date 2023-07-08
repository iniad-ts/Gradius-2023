//ここにゲーム画面をつくる

import { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

const App = () => {
  const [height_of_fighter, setheight_of_fighter] = useState(0);
  return (
    <Stage width={1100} height={690}>
      <Layer>
        <Rect fill="red" width={100} height={40} x={100} y={150} />
      </Layer>
    </Stage>
  );
};

export default App;
