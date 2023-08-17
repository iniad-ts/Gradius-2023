import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [gradius, setGradius] = useState([0, 0]);
  const [enemy, setEnemy] = useState([1000, 500]);
  const [gradiusBullet, setGradiusBullet] = useState([gradius[0] + 50, gradius[1] + 25]);
  const windowWidth = Number(window.innerWidth);
  const windowHeight = Number(window.innerHeight);

  const updateGradiusBullet = async () => {
    setGradiusBullet((prev) => {
      if (prev[0] < windowWidth) {
        return [prev[0] + 10, prev[1]];
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <Stage width={windowWidth} height={windowHeight}>
        <Layer>
          <Rect
            stroke="black"
            strokeWidth={1}
            x={0}
            y={0}
            width={windowWidth}
            height={windowHeight}
          />
          <Rect x={gradius[0]} y={gradius[1]} width={50} height={50} fill="red" />
          <Rect x={enemy[0]} y={enemy[1]} width={50} height={50} fill="green" />
          <Circle x={gradiusBullet[0]} y={gradiusBullet[1]} radius={10} fill="blue" />
        </Layer>
      </Stage>
      ;
    </>
  );
};

export default Home;
