// import type { MoveDirection } from '$/usecase/playerUsecase';

import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Joystick, JoystickShape } from 'react-joystick-component';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Home = () => {
  const joystickRef = React.useRef<HTMLDivElement>(null);

  const [user] = useAtom(userAtom);
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (joystickRef.current !== null) {
      // joystickRef.currentがnullでないことをチェック
      const width = joystickRef.current.offsetWidth;
      const height = joystickRef.current.offsetHeight;
      setSize(width);

      console.log('Joystick div width: ', width);
      console.log('Joystick div height: ', height);
    }
    // const Load=()=>{
    //   const getHuge = setInterval(joystickRef, 2500);
    // return () => {
    //   clearInterval(getHuge);
    // };
    // }
  }, [setSize]);

  // 一時的にコメントアウト
  if (!user) return <Loading visible />;

  const isValidInput = (pushed: string): pushed is 'up' | 'left' | 'right' | 'down' | 'push' => {
    return ['up', 'left', 'right', 'down', 'push'].includes(pushed);
  };
  const pushButton = async (pushed: string) => {
    if (isValidInput(pushed)) {
      const input = pushed;
      const res = await apiClient.rooms.control.$post({ body: input });
      console.log(res);
    }
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
            />
          </div>
          <div className={styles.shoot} />
        </div>
      </div>
    </>
  );
};

export default Home;
