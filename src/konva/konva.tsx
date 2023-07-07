import { Layer, Rect, Stage } from 'react-konva';

function App() {
  return (
    <Stage width={2200} height={900}>
      <Layer>
        <Rect fill="red" width={200} height={200} x={100} y={0} />
        <Rect fill="blue" x={900} y={400} width={200} height={200} />
      </Layer>
    </Stage>
  );
}

export default App;
