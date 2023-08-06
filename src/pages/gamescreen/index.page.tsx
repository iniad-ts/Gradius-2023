import { useAtom } from 'jotai';
import { Circle, Layer, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;
  return (
    <>
      <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to frourio!
      </div>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle fill="black" x={500} y={300} radius={50} />
        </Layer>
      </Stage>
    </>
  );
};
export default Home;
