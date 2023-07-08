import { Layer, Rect, Stage } from 'react-konva';

function App() {
  return (
    <Stage width={500} height={800}>
      <Layer>
        <Rect fill="red" x={30} y={300} width={200} height={200} />
      </Layer>
    </Stage>
  );
}

export default App;
