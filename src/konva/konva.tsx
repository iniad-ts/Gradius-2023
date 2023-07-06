import { Layer, Rect, Stage } from 'react-konva';

function App() {
  return (
    <Stage width={500} height={500}>
      <Layer>
        <Rect fill="red" width={200} height={200} x={0} y={0} />
      </Layer>
    </Stage>
  );
}

export default App;
