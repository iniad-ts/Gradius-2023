// import type { MoveDirection } from '$/usecase/playerUsecase';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Joystick, JoystickShape } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import styles from './controller.module.css';

const Home = () => {
  const joystickRef = useRef<HTMLDivElement>(null);
  console.log(joystickRef);

  const [user] = useAtom(userAtom);
  const [size, setSize] = useState<number>(0);
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout | null>(null);
  const moveDirection = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const getsize = () => {
    if (joystickRef.current !== null) {
      // joystickRef.currentがnullでないことをチェック
      const width = joystickRef.current.offsetWidth;
      setSize(width);
    }
  };

  // useEffectフックをトップレベルに配置します
  useEffect(() => {
    const cance = setInterval(getsize, 100);
    return () => {
      console.log('AAAAAAAAAAAAAAAAAAAAAA');
      clearInterval(cance);
    };
  }, []); // 依存性配列は空にします。getsizeが変更されるとタイマーはリセットされません
  if (!user) return <Loading visible />;
  // const isValidInput = (pushed: string): pushed is 'up' | 'left' | 'right' | 'down' | 'push' => {
  //   return ['up', 'left', 'right', 'down', 'push'].includes(pushed);
  // };
  // const pushButton = async (pushed: string) => {
  //   if (isValidInput(pushed)) {
  //     const input = pushed;
  //     const res = await apiClient.rooms.control.$post({ body: input });
  //     console.log(res);
  //   }
  // };
  const move = async () => {
    // await apiClient.move.$post({ direction: moveDirection });
    console.log('move', moveDirection.current);
  };
  const moveStart = () => {
    const intervalId = setInterval(move, 50);
    setMoveIntervalId(intervalId);
  };
  const moveEnd = () => {
    if (moveIntervalId === null) return;
    clearInterval(moveIntervalId);
  };
  const handleMove = (e: IJoystickUpdateEvent) => {
    const moveTo = {
      x: Math.round(e.x ?? 0),
      y: Math.round(e.y ?? 0),
    };
    moveDirection.current = moveTo;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.board}>
          <div ref={joystickRef} className={styles.joystick}>
            <Joystick
              size={size}
              stickSize={size / 2}
              baseColor="gray"
              stickColor="black"
              baseShape={JoystickShape.Square}
              move={handleMove}
              stop={moveEnd}
              start={moveStart}
            />
          </div>
          <button className={styles.shoot} />
        </div>
      </div>
    </>
  );
};
export default Home;
