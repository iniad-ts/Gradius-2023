import { useAtom } from 'jotai';
import { Circle, Layer, Stage } from 'react-konva';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';

const Game = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  return (
    <div>
      <Stage width={1920} height={1080}>
        <Layer>
          <Circle x={100} y={100} radius={50} fill="red" />
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
