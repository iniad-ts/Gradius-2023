import { useAtom } from 'jotai';
import { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [nowkey, setNowkey] = useState([0, 0]);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const keyDownHandler = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === 'ArrowUp') {
      const a = await apiClient.control.post({ body: { x: nowkey[0], y: nowkey[1], a: 1 } });
      setNowkey([a.body.x, a.body.y]);
      const p = board.map((row) => row.map(() => 0));
      p[a.body.x][a.body.y] = 1;
      setBoard(p);
      console.table(p);
    }

    if (key === 'ArrowDown') {
      const a = await apiClient.control.post({ body: { x: nowkey[0], y: nowkey[1], a: 2 } });
      setNowkey([a.body.x, a.body.y]);
      const p = board.map((row) => row.map(() => 0));
      p[a.body.x][a.body.y] = 1;
      setBoard(p);
      console.table(p);
    }

    if (key === 'ArrowLeft') {
      const a = await apiClient.control.post({ body: { x: nowkey[0], y: nowkey[1], a: 0 } });
      setNowkey([a.body.x, a.body.y]);
      const p = board.map((row) => row.map(() => 0));
      p[a.body.x][a.body.y] = 1;
      setBoard(p);
      console.table(p);
    }

    if (key === 'ArrowRight') {
      const a = await apiClient.control.post({ body: { x: nowkey[0], y: nowkey[1], a: 3 } });
      setNowkey([a.body.x, a.body.y]);
      const p = board.map((row) => row.map(() => 0));
      p[a.body.x][a.body.y] = 1;
      setBoard(p);
      console.table(p);
    }
  };

  if (!user) return <Loading visible />;

  return (
    <>
      <div tabIndex={0} onKeyDown={keyDownHandler} style={{ border: 'solid' }}>
        <Stage width={1920} height={1080}>
          <Layer>
            <Rect fill="white" width={1920} height={1080} />
            <Rect fill="red" x={120 * nowkey[1]} y={120 * nowkey[0]} width={120} height={120} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default Home;
