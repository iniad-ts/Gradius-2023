import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage, Text } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import styles from 'src/pages/gradius/gradius.module.css';
import { apiClient } from 'src/utils/apiClient';

function App() {
  const [position, setPosition] = useState([30, 300]);
  const [gunPosition, setGunPosition] = useState<number[][]>([]);
  const gradiusImg = useRef(new window.Image());
  const [background_pos, setbackground_pos] = useState(0);
  const [isGradiusLoaded, setIsGradiusLoaded] = useState(false);
  const fetchBoard = useCallback(async () => {
    {
      const new_position = await apiClient.rooms.gradius.$get();
      const newGunPosition = await apiClient.rooms.gradius2.$get();
      setPosition(new_position);
      setGunPosition(newGunPosition);
      setbackground_pos((pre_background_pos) => pre_background_pos - 1);
    }
  }, []);

  //5ミリ秒ごとに飛行機の位置情報を取りに行く
  useEffect(() => {
    const cancelID = setInterval(fetchBoard, 5);
    return () => {
      clearInterval(cancelID);
    };
  }, [fetchBoard]);

  useEffect(() => {
    gradiusImg.current.src = '/images/gradius.jpg';
    gradiusImg.current.onload = () => {
      setIsGradiusLoaded(true);
    };
  }, []);
  if (!isGradiusLoaded) return <Loading visible />;
  return (
    <Stage
      width={1500}
      height={800}
      className={styles.background}
      style={{ backgroundPosition: `${background_pos}px 0` }}
    >
      {/* ↓球 */}
      <Layer>
        {gunPosition.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="red"
            width={20}
            height={10}
            x={laser[0]}
            y={laser[1]}
          />
        ))}
      </Layer>
      <Layer>
        {/* ↓飛行機 */}
        <Image image={gradiusImg.current} width={175} height={75} x={position[0]} y={position[1]} />
      </Layer>
      <Layer>
        <Text text={'Score:'} x={0} y={10} fontSize={30} width={500} fill="black" />
      </Layer>
    </Stage>
  );
}

export default App;
