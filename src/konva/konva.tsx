import { Layer, Rect, Stage } from 'react-konva';

function App() {
  return (
    <Stage width={500} height={500}>
      <Layer>
        <Rect fill="red" width={300} height={200} />
      </Layer>
    </Stage>
  );
}

export default App;
