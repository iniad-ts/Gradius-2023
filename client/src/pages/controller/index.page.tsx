import { useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import styles from './controller.module.css';

const Home = () => {
  const [windowsize, setWindowsize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout | null>(null);
  const moveDirection = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const shootBullet = async () => {
    console.log('shoot');
  };
  const move = (e: IJoystickUpdateEvent) => {
    const moveTo = {
      x: Math.round(e.x ?? 0),
      y: Math.round(e.y ?? 0),
    };
    moveDirection.current = moveTo;
    console.log(moveTo);
  };

  return (
    <div className={styles.controller}>
      <div className={styles.joystick}>
        <Joystick
          size={Math.min(windowsize.width, windowsize.height) * 0.1}
          baseColor="#000000"
          stickColor="#FFFFFF"
          move={move}
        />
      </div>
      <button className={styles.button} onClick={shootBullet}>
        🚀
      </button>
    </div>
  );
};

export default Home;
