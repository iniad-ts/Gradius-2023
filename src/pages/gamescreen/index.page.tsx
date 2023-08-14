import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Circle, Layer, Line, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../../atoms/user';

const Home = () => {
  const [UpArrow, setUpArrow] = useState(false);
  const [DownArrow, setDownArrow] = useState(false);
  const [LeftArrow, setLeftArrow] = useState(false);
  const [RightArrow, setRightArrow] = useState(false);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setUpArrow(true);
      } else if (event.key === 'ArrowDown') {
        setDownArrow(true);
      } else if (event.key === 'ArrowLeft') {
        setLeftArrow(true);
      } else if (event.key === 'ArrowRight') {
        setRightArrow(true);
      }
    };

    const keyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setUpArrow(false);
      } else if (event.key === 'ArrowDown') {
        setDownArrow(false);
      } else if (event.key === 'ArrowLeft') {
        setLeftArrow(false);
      } else if (event.key === 'ArrowRight') {
        setRightArrow(false);
      }
    };

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, []);

  if (!user) return <Loading visible />;
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          x={450}
          y={200}
          points={[0, 0, 100, 0, 50, 50]}
          tension={0.2}
          closed
          stroke="black"
          fillLinearGradientStartPoint={{ x: 80, y: 0 }}
          fillLinearGradientEndPoint={{ x: 50, y: 50 }}
          fillLinearGradientColorStops={[0, 'blue', 1, 'black']}
        />
        <Circle x={200} y={200} radius={30} fill="red" />
      </Layer>
    </Stage>
  );
};
export default Home;
