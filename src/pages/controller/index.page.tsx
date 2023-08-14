// import type { MoveDirection } from '$/usecase/playerUsecase';
import type { MoveDirection } from '$/Usecase/playerUsecase';

import type { UserId } from '$/commonTypesWithClient/branded';
import { UserIdParser } from '$/service/idParsers';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Joystick, JoystickShape } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Home = () => {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(0);
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout | null>(null);
  const moveDirection = useRef<MoveDirection>({ x: 0, y: 0 });
  const [userId, setUserId] = useState<UserId | null>(
    UserIdParser.parse(localStorage.getItem('userId'))
  );
  const router = useRouter();

  if (localStorage.getItem('userId') === null) {
    router.push('/gradiusLogin');
  }

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
      clearInterval(cance);
    };
  }, []); // 依存性配列は空にします。getsizeが変更されるとタイマーはリセットされません

  const shoot = async () => {
    if (userId === null) return;
    await apiClient.rooms.gunPosition.$post({
      body: userId,
    });
  };
  const move = async () => {
    if (userId === null) return;
    await apiClient.rooms.control.$post({
      body: { moveDirection: moveDirection.current, userId },
    });
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
      y: -Math.round(e.y ?? 0),
    };
    moveDirection.current = moveTo;
  };

  return (
    <>
      <div className={styles.container}>
        {/* <button onClick={() => pushButton('up')}>kakikukeko</button> */}
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
          {/* <div className={styles.ma}>
            <p>Score</p>
          </div> */}
          <button className={styles.shoot} onClick={shoot} />
        </div>
      </div>
      <p>userid:{userId}</p>
    </>
  );
};
export default Home;
