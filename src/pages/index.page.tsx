import { Layer, Rect, Stage } from 'react-konva';
const Home = () => {
  return (
    <>
      <Stage width={1280} height={720}>
        <Layer>
          <Rect x={0} y={0} width={50} height={50} fill="red" />
          <Rect x={1230} y={670} width={50} height={50} fill="green" />
        </Layer>
      </Stage>
      ;
    </>
  );
};

export default Home;
