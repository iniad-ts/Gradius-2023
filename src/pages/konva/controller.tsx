import { Stage, Layer, Rect } from 'react-konva';

function Joystick() {
  return (
    
    <Stage width={500} height={500}>
      <Layer>
        <Rect fill='red' width={100} height={200} />
      </Layer>
    </Stage>
  );
}

export default Joystick;
