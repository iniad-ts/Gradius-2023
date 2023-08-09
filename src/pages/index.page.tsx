import { useEffect, useState } from 'react';
import { Ellipse, Layer, Line, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';
//a
const Home = () => {
  const hoge = true;
  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const game = await apiClient.game.$post({
      body: { position: layerPosition, key: e.code },
    });
    setLayerPosition(game.position);
    if (e.code === 'KeyZ') {
      setIsFiring(true);
    }
  };
  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await apiClient.create.$post();
    console.log(e);
  };
  const [layerPosition, setLayerPosition] = useState({ x: 0, y: 200 });
  const [shotPosition, setShotPosition] = useState({ x: layerPosition.x, y: layerPosition.y });
  const [isFiring, setIsFiring] = useState(false);
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      const typedEvent = event as unknown as React.KeyboardEvent<HTMLDivElement>;
      switch (typedEvent.code) {
        case 'KeyZ':
          setIsFiring(true);
          break;
        default:
          break;
      }
    };
    if (isFiring) {
      const shotInterval = setInterval(() => {
        setShotPosition((prevPosition) => ({
          x: prevPosition.x + 15,
          y: prevPosition.y,
        }));
      }, 50);

      setTimeout(() => {
        clearInterval(shotInterval);
        setIsFiring(false);
        setShotPosition({ x: layerPosition.x, y: layerPosition.y });
      }, 1000);
    }

    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [isFiring, layerPosition]);

  if (!hoge) return <Loading visible />;
  return (
    <>
      <div
        className="container"
        onKeyDown={keydown}
        style={{ border: 'solid' }}
        onClick={click}
        tabIndex={0}
      >
        <div id="key">X:{layerPosition.x}</div>
        <div id="key">Y:{layerPosition.y}</div>
        <div id="key">shot:{isFiring ? 'Fired' : 'Not fired'}</div>
      </div>
      <div
        id="player"
        style={{
          position: 'absolute',
          left: `${layerPosition.x}px`,
          top: `${layerPosition.y}px`,
          backgroundColor: 'red',
          width: '10px',
          height: '10px',
        }}
      />
      <div className={styles.board}>
        <Stage width={640} height={400}>
          <Layer>
            <Rect width={640} height={400} stroke="black" fill="blue" />
          </Layer>
          <Layer x={layerPosition.x} y={layerPosition.y}>
            <Line
              x={0}
              y={10}
              points={[0, 0, 5, 5, 15, 5]}
              closed
              strokeWidth={1}
              stroke="black"
              fill="white"
            />
            <Line
              x={5}
              y={15}
              points={[0, 0, 10, 0, 15, 2.5, 30, 2.5, 20, 7, 20, 5, 0, 5]}
              strokeWidth={1}
              closed
              stroke="black"
              fill="white"
            />
            <Line
              x={5}
              y={15}
              points={[0, 0, 0, 5, -3, 5, -3, 0]}
              strokeWidth={1}
              closed
              stroke="black"
              fill="white"
            />
            <Line
              x={5}
              y={15}
              points={[0, 0, 10, 0, 15, 2.5, 30, 2.5, 20, 7, 20, 5, 0, 5]}
              strokeWidth={1}
              closed
              stroke="black"
              fill="white"
            />
            <Line
              x={5}
              y={20}
              points={[0, 0, 20, 0, 20, 2, 7, 4]}
              strokeWidth={1}
              closed
              stroke="black"
              fill="white"
            />
            <Line
              x={15}
              y={12}
              points={[0, 0, 15, 5, 5, 5]}
              closed
              tension={0.5}
              strokeWidth={1}
              stroke="black"
              fill="red"
            />
          </Layer>
          {isFiring && (
            <Layer x={shotPosition.x + 40} y={shotPosition.y + 15}>
              <Ellipse fill="white" radiusX={10} radiusY={5} />
            </Layer>
          )}
        </Stage>
      </div>
    </>
  );
};

export default Home;
