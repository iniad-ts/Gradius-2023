import { useAtom } from 'jotai';
import { Circle, Layer, Line, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../../atoms/user';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { checkCollision } from './checkCollision';

const Home = () => {
  const [UpArrow, setUpArrow] = useState(false);
  const [DownArrow, setDownArrow] = useState(false);
  const [LeftArrow, setLeftArrow] = useState(false);
  const [RightArrow, setRightArrow] = useState(false);
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
  const [enemy, setEnemy] = useState<{ x: number; y: number; speedX: number }[]>([
    { x: 1000, y: 300, speedX: -120 },
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

  //高速で実行される(Animation)
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
          {enemy.map((state, index) => (
            <Circle key={index} x={state.x} y={state.y} radius={30} fill="red" />
          ))}
          {gradiusBullet.map((bullet, index) => (
            <Circle key={index} x={bullet.x} y={bullet.y} radius={5} fill={'yellow'} />
          ))}
        </Layer>
      </Stage>
    </>
  );

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
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
};
export default Home;
