import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import styles from './index.module.css';
const Home = () => {
  //黒い枠の中をクリックし、矢印ボタンを押すと、赤い点が動くよー
  const [playerX, setPlayerX] = useState(4);
  const [playerY, setPlayerY] = useState(0);
  const [dy, setDy] = useState(0);
  const [bullet, setbullets] = useState<{ x: number; y: number }[]>([]);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [isMovingDown, setIsMovingDown] = useState(false);
  const gradiusImg = useRef(new window.Image());
  const [isGradiusLoaded, setIsGradiusLoaded] = useState(false);
  const [backgroundX, setBackgroundX] = useState(0);
  const [imageBack, setImageBack] = useState(new window.Image());
  const [imageTama, setImageTama] = useState(new window.Image());
  const [score, setScore] = useState(0);
  const [playerLife, setPlayerLife] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 2 },
    { x: 8, y: 4 },
  ]);
  const enemyAnimation = useRef<Konva.Animation | null>(null);
  const [resetGame, setResetGame] = useState(false); // 追加

  const [dx, setDx] = useState(-1); // x方向の移動量
  const dx2 = 1;
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const hoge = true;
  useEffect(() => {
    const animate = () => {
      setBackgroundX((prevBackgroundX) => prevBackgroundX - 1); // 速度や方向を調整

      // 次のフレームを要求
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      // コンポーネントがアンマウントされる際にアニメーションを停止
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const image = new window.Image();
    const image2 = new window.Image();
    image.src = '/images/jett4.png';
    image2.src = '/images/tama.png';
    image.onload = () => {
      setImageBack(image);
      setImageTama(image2);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line complexity
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {
        setIsMovingUp(true);
      } else if (e.code === 'ArrowDown') {
        setIsMovingDown(true);
      } else if (e.code === 'ArrowLeft') {
        setIsMovingLeft(true);
      } else if (e.code === 'ArrowRight') {
        setIsMovingRight(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {
        setIsMovingUp(false);
      } else if (e.code === 'ArrowDown') {
        setIsMovingDown(false);
      } else if (e.code === 'ArrowLeft') {
        setIsMovingLeft(false);
      } else if (e.code === 'ArrowRight') {
        setIsMovingRight(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const animate = () => {
      if (isMovingLeft) {
        setPlayerY((prevY) => Math.max(prevY - 0.05, 0));
      }
      if (isMovingRight) {
        setPlayerY((prevY) => Math.min(prevY + 0.05, 7));
      }
      if (isMovingUp) {
        setPlayerX((prevX) => Math.max(prevX - 0.05, 0));
      }
      if (isMovingDown) {
        setPlayerX((prevX) => Math.min(prevX + 0.05, 7));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMovingLeft, isMovingRight, isMovingUp, isMovingDown]);

  const tamaAnimation = useRef<Konva.Animation | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const newBullets = {
          x: playerY,
          y: playerX,
        };
        setbullets((prevBullets) => [...prevBullets, newBullets]);

        if (tamaAnimation.current === null) {
          tamaAnimation.current = new Konva.Animation((anim) => {
            if (anim !== undefined) {
              setbullets((prevBullets) => {
                const speed = 10; // 速度を適切な値に調整
                const dist = speed * (anim.timeDiff / 1000);
                const newBullets = prevBullets.map((bullet) => ({
                  ...bullet,
                  x: bullet.x + dist, // x座標にdistを足す
                }));
                return newBullets.filter((bullet) => bullet.x <= 30);
              });
            }
          });
          tamaAnimation.current.start();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerX, playerY]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && isGameOver) {
        // ゲームオーバー状態で Enter キーが押された場合
        setPlayerX(4); // プレイヤーの初期 X 座標にリセット
        setPlayerY(0); // プレイヤーの初期 Y 座標にリセット
        setbullets([]); // 弾をリセット
        setScore(0); // スコアをリセット
        setPlayerLife(3); // ライフをリセット
        setIsGameOver(false); // ゲームオーバーフラグをリセット
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOver]);

  // const findnumber = (n: number) => {
  //   let count = 0;
  //   for (let y = 0; y < board.length; y++) {
  //     for (let x = 0; x < board[y].length; x++) {
  //       // eslint-disable-next-line max-depth
  //       if (board[y][x] === n) {
  //         count++;
  //       }
  //     }
  //   }
  //   return count;
  // };
  useEffect(() => {
    if (enemyAnimation.current === null) {
      enemyAnimation.current = new Konva.Animation((anim) => {
        if (anim !== undefined) {
          setEnemies((prevEnemies) => {
            const speed = 5;
            const dist = speed * (anim.timeDiff / 1000);
            const newEnemies = prevEnemies.map((enemy) => ({
              ...enemy,
              x: enemy.x - dist,
            }));
            // 新しい敵を生成
            if (Math.random() < 0.02) {
              newEnemies.push({ x: 10, y: Math.random() * 7 });
            }

            return newEnemies.filter((enemy) => enemy.x >= -30);
          });
        }
      });
      enemyAnimation.current.start();
    }
  }, [enemies]);

  const detectCollisions = () => {
    setbullets((prevBullets) => {
      const newBullets = prevBullets.filter((bullet) => {
        const bulletHitbox = {
          x: bullet.x * 100 + 50,
          y: bullet.y * 100 + 50,
          radius: 10,
        };

        let bulletHitEnemy = false;

        const remainingEnemies = enemies.filter((enemy) => {
          const enemyHitbox = {
            x: enemy.x * 100,
            y: enemy.y * 100 + 50,
            radius: 20,
          };

          const distance = Math.sqrt(
            Math.pow(bulletHitbox.x - enemyHitbox.x, 2) +
              Math.pow(bulletHitbox.y - enemyHitbox.y, 2)
          );

          const collisionDetected = distance < bulletHitbox.radius + enemyHitbox.radius;

          if (collisionDetected) {
            bulletHitEnemy = true;
            // eslint-disable-next-line max-nested-callbacks
            setScore((prevScore) => prevScore + 0.5);
            console.log(score);
            return false; // 衝突した敵は残らない
          }

          return true;
        });

        if (bulletHitEnemy) {
          setEnemies(remainingEnemies); // 衝突した場合、敵を更新
          return null; // 弾も消滅
        }

        return bullet;
      });

      return newBullets.filter(Boolean);
    });
    const playerHitbox = {
      x: playerY * 100, // プレイヤーの位置に合わせて調整
      y: playerX * 100, // プレイヤーの位置に合わせて調整
      radius: 10, // プレイヤーのサイズに合わせて調整
    };

    const remainingEnemies = enemies.filter((enemy) => {
      const enemyHitbox = {
        x: enemy.x * 100,
        y: enemy.y * 100,
        radius: 20,
      };

      const distance = Math.sqrt(
        Math.pow(playerHitbox.x - enemyHitbox.x, 2) + Math.pow(playerHitbox.y - enemyHitbox.y, 2)
      );

      const collisionDetected = distance < playerHitbox.radius + enemyHitbox.radius;

      if (collisionDetected) {
        // プレイヤーと敵が衝突した場合、その敵を削除する
        return false;
      }

      return true;
    });

    if (remainingEnemies.length < enemies.length) {
      setPlayerLife((prevLife) => prevLife - 1);
      setEnemies(remainingEnemies);
      if (playerLife - 1 <= 0) {
        setIsGameOver(true);
      }
    }
  };
  

  const GameOverScreen = () => {
    return (
      <div className="game-over-container">
        <p className={styles['score-text']}>Your Score: {Math.max(0, score)}</p> {/* スコア表示を修正 */}
        <img src="images/gameover2.jpg" alt="Game Over" className={styles['game-over-image']} />
      </div>
    );
  };

  // 上記の当たり判定関数を適切なタイミングで呼び出す
  useEffect(() => {
    detectCollisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bullet, enemies]);
  if (!hoge) return <Loading visible />;
  return (
    <>
      <div className={styles.lifeContainer}>
        <p className={styles.life}>Life: {playerLife}</p>
      </div>
      <div className={styles.scoreContainer}>
        <p className={styles.score}>Score: {score}</p>
      </div>
      <Stage width={1200} height={800} className={styles.background}>
        <Layer>
          <Image image={imageBack} x={playerY * 100} y={playerX * 100} width={90} height={130} />
          {bullet.map((bullet, index) => (
            <Image
              image={imageTama}
              key={index}
              x={bullet.x * 100 + 50}
              y={bullet.y * 100 + 50}
              radius={20}
              scaleX={0.05}
              scaleY={0.05}
            />
          ))}
          {enemies.map((enemy, index) => (
            <Circle key={index} x={enemy.x * 100} y={enemy.y * 100 + 50} radius={20} fill="green" />
          ))}
        </Layer>
      </Stage>
      {isGameOver && (
        <div className={styles.gameOverOverlay}>
          <GameOverScreen />
        </div>
      )}
    </>
  );
};

export default Home;
