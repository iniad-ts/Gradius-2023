import { useAtom } from 'jotai';
import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../../atoms/user';

const Home = () => {
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
      case 'KeyZ':
        setBullet(true);
        break;
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
      case 'KeyZ':
        setBullet(false);
        break;
    }
  };
  const spawnEnemy = (prevEnemy: { x: number; y: number; speedX: number }[]) => {
    const newEnemies = [];
    const enemyspwan = {
      x: 300,
      y: 300,
      speedX: -120,
    };
    newEnemies.push(enemyspwan);

    return [...prevEnemy, ...newEnemies];
  };
  function checkCollision(
    bullet: { x: number; y: number },
    enemy: { x: number; y: number; speedX: number }
  ) {
    const bullet_radius = 5;
    const enemy_radius = 32.5;
    const dx = bullet.x - enemy.x;
    const dy = bullet.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const collisionDistance = bullet_radius + enemy_radius;
    return distance <= collisionDistance;
  }

  const checkCollisions = () => {
    setEnemy((prevEnemies) => {
      return prevEnemies.filter((enemy) => {
        const collision = gradiusBullet.some((bullet) => checkCollision(bullet, enemy));
        if (collision) {
          // 接触した敵は除外する
          setGradiusBullet((prevBullets) => {
            return prevBullets.filter((bullet) => !checkCollision(bullet, enemy));
          });
          return false;
        }
        return true;
      });
    });
  };

  //高速で実行される(Animation)
  useEffect(() => {
    const anim = new Konva.Animation((frame) => {
      if (frame) {
        const timeDiff = frame.timeDiff / 1000; // ミリ秒を秒に変換

        //自機移動 上下制限
        const nowstate = gradiusPosition;
        nowstate[0] = Math.min(
          Math.max(
            gradiusPosition[0] +
              (gradiusDirection.left ? -1 : 0) +
              (gradiusDirection.right ? +1 : 0),
            20
          ),
          window.innerWidth - 50
        );
        nowstate[1] = Math.min(
          Math.max(
            gradiusPosition[1] + (gradiusDirection.up ? -1 : 0) + (gradiusDirection.down ? +1 : 0),
            0
          ),
          window.innerHeight - 50
        );
        setGradiusPosition(nowstate);
        //弾発射
        setShottimer(shottimer + timeDiff);
        if (bullet) {
          if (shottimer > 0.3) {
            setGradiusBullet((prevGradiusBullet) => {
              return [
                ...prevGradiusBullet,
                { x: gradiusPosition[0] + 54, y: gradiusPosition[1], speedX: 2000 },
              ];
            });

            setShottimer(0);
          }
        }

        // ボールの位置や状態を更新する処理
        setGradiusBullet(
          (prev) =>
            prev
              .map((bullet) => ({
                ...bullet,
                x: bullet.x + bullet.speedX * timeDiff,
              }))
              .filter((bullet) => bullet.x < window.innerWidth && bullet.y < window.innerHeight) // 画面の右端に到達していない弾のみをフィルタリング
        );
        // 弾と敵が当たっているか
        checkCollisions();
      }
    });
    anim.start();

    animationRef.current = anim;

    return () => {
      anim.stop();
    };
  });

  useEffect(() => {
    // コンポーネントがマウントされたときにイベントリスナーを追加
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
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
};
export default Home;
