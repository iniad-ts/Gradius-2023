import { useAtom } from 'jotai';
import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

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
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to frourio!
      </div>
      <div
        className="container"
        tabIndex={0}
        onKeyDown={keyDownHandler}
        style={{ border: 'solid' }}
      >
        <p>{nowkey}</p>
      </div>
    </>
  );
};

export default Home;
