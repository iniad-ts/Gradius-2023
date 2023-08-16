/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable max-depth */
/* eslint-disable max-nested-callbacks */
/* eslint-disable react-hooks/exhaustive-deps */

import { useAtom } from 'jotai';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';
import { userAtom } from '../../atoms/user';
import { spawnRandomTypeOfEnemy } from '../enemyspawn';
import { checkCollision } from './checkCollision';

const Home = () => {
  const [enemyImage1] = useImage(staticPath.images.rensyu1_png);
  const [enemyImage2] = useImage(staticPath.images.rensyu2_png);
  const [enemyImage3] = useImage(staticPath.images.rensyu3_png);
  const [user] = useAtom(userAtom);
  const [gradiusPosition, setGradiusPosition] = useState([100, 300]);
  const [gradiusBullet, setGradiusBullet] = useState<{ x: number; y: number; speedX: number }[]>(
    []
  );
  const [gradiusDirection, setGradiusDirection] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const [bullet, setBullet] = useState(false);
  const [shottimer, setShottimer] = useState(0);
  const animationRef = useRef<Konva.Animation | null>(null);
  const [enemy, setEnemy] = useState<{ x: number; y: number; speedX: number; status: number }[]>([
    {
      x: 1000,
      y: 300,
      speedX: -120,
      status: 1,
    },
  ]);

  //キーを押したときに実行される関数
  const handleKeyDown = async (event: KeyboardEvent) => {
    const newDirection = gradiusDirection;
    switch (event.code) {
      case 'ArrowUp':
        newDirection['up'] = true;
        setGradiusDirection(newDirection);
        break;
      case 'ArrowDown':
        newDirection['down'] = true;
        setGradiusDirection(newDirection);
        break;
      case 'ArrowLeft':
        newDirection['left'] = true;
        setGradiusDirection(newDirection);
        break;
      case 'ArrowRight':
        newDirection['right'] = true;
        setGradiusDirection(newDirection);
        break;
    }
  };
  const handleGunKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'KeyZ') {
      setBullet(true);
    }
  };
  // キーを離したときに実行される関数
  const handleKeyUp = (event: KeyboardEvent) => {
    const newDirection = gradiusDirection;
    switch (event.code) {
      case 'ArrowUp':
        newDirection['up'] = false;
        setGradiusDirection(newDirection);
        break;
      case 'ArrowDown':
        newDirection['down'] = false;
        setGradiusDirection(newDirection);
        break;
      case 'ArrowLeft':
        newDirection['left'] = false;
        setGradiusDirection(newDirection);
        break;
      case 'ArrowRight':
        newDirection['right'] = false;
        setGradiusDirection(newDirection);
        break;
    }
  };
  const handleGunKeyUp = (event: KeyboardEvent) => {
    if (event.code === 'KeyZ') {
      setBullet(false);
    }
  };

  const filterBullets = (enemy: { x: number; y: number; speedX: number }) => {
    setGradiusBullet((prevBullets) => {
      return prevBullets.filter((bullet) => !checkCollision(bullet, enemy));
    });
  };
  const checkCollisions = () => {
    setEnemy((prevEnemies) => {
      return prevEnemies.filter((enemy) => {
        const collision = gradiusBullet.some((bullet) => checkCollision(bullet, enemy));
        if (collision) {
          // 接触した敵は除外する
          filterBullets(enemy);
          return false;
        }
        return true;
      });
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setEnemy(() => spawnRandomTypeOfEnemy(enemy));
      console.table(enemy);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // 高速で実行される(Animation)
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (!frame) return;

      const timeDiff = frame.timeDiff / 1000;
      updateGradiusPosition();
      updateBulletPositions(timeDiff);
      checkCollisions();
    });
    anim.start();
    animationRef.current = anim;
    return () => {
      anim.stop();
    };
  });
  const updateGradiusPosition = () => {
    setGradiusPosition((prevPosition) => {
      const newPosition = [
        Math.min(
          Math.max(
            prevPosition[0] + (gradiusDirection.left ? -5 : 0) + (gradiusDirection.right ? 5 : 0),
            20
          ),
          window.innerWidth - 50
        ),
        Math.min(
          Math.max(
            prevPosition[1] + (gradiusDirection.up ? -5 : 0) + (gradiusDirection.down ? 5 : 0),
            0
          ),
          window.innerHeight - 50
        ),
      ];
      return newPosition;
    });
  };
  const updateBulletPositions = (timeDiff: number) => {
    setShottimer(shottimer + timeDiff);
    if (bullet && shottimer > 0.3) {
      setGradiusBullet((prevGradiusBullet) => [
        ...prevGradiusBullet,
        { x: gradiusPosition[0] + 54, y: gradiusPosition[1], speedX: 2000 },
      ]);
      setShottimer(0);
    }
    setGradiusBullet((prevBullets) =>
      prevBullets
        .map((bullet) => ({
          ...bullet,
          x: bullet.x + bullet.speedX * timeDiff,
        }))
        .filter((bullet) => bullet.x < window.innerWidth && bullet.y < window.innerHeight)
    );
  };
  useEffect(() => {
    // コンポーネントがマウントされたときにイベントリスナーを追加
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleGunKeyDown);
    document.addEventListener('keyup', handleGunKeyUp);

    // コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleGunKeyDown);
      document.removeEventListener('keyup', handleGunKeyUp);
    };
  });

  if (!user) return <Loading visible />;
  return (
    <>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* 自機 */}
          <Circle fill="black" x={gradiusPosition[0]} y={gradiusPosition[1]} radius={50} />
          {/* 敵 */}
          {enemy.map((state, index) => {
            const image = [enemyImage1, enemyImage2, enemyImage3][state.status];
            return (
              <Image image={image} key={index} x={state.x} y={state.y} width={100} height={100} />
            );
          })}
          {gradiusBullet.map((bullet, index) => (
            <Circle key={index} x={bullet.x} y={bullet.y} radius={5} fill={'yellow'} />
          ))}
        </Layer>
      </Stage>
    </>
  );
};
export default Home;
