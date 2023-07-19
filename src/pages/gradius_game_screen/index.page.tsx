//ここにゲーム画面をつくる
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './gradius_game_screen.module.css';
// import enemy01 from '../../../public/images/enemy01.png';
// import fighter from '../../../public/images/fighter.png';

const App = () => {
  const [fight_position, setfight_position] = useState([0, 0]);
  const [enemies, setenemies] = useState<number[][]>([]);
  const [laser_pos, setlaser_pos] = useState<number[][]>([]);
  const [background_pos, setbackground_pos] = useState(0);
  const [isFighterLoaded, setIsFighterLoaded] = useState(false);
  const fighterImgRef = useRef(new window.Image());
  const enemyImgRef = useRef(new window.Image());
  enemyImgRef.current.src = '/images/GAMIRASU.jpg';

  const fetchBord = async () => {
    const new_fighter_position = await apiClient.player.$get();
    const new_enemy_pos = await apiClient.enemy.$get();
    const new_laser_pos = await apiClient.laser.$get();
    setfight_position(new_fighter_position);
    setenemies(new_enemy_pos);
    setlaser_pos(new_laser_pos);
    setbackground_pos((pre_background_pos) => pre_background_pos - 1);
  };
  console.log(laser_pos);
  useEffect(() => {
    const cancellid = setInterval(fetchBord, 10);
    return () => {
      clearInterval(cancellid);
    };
  }, []);

  useEffect(() => {
    fighterImgRef.current.src = '/images/YAMATO.jpg'; // 画像ファイルの相対パスを指定
    fighterImgRef.current.onload = () => {
      setIsFighterLoaded(true);
    };
  }, []);
  //localhost:3000/gradius_game_screen/
  if (!isFighterLoaded) return <Loading visible />;
  return (
    <Stage
      width={1280}
      height={780}
      className={styles.container}
      style={{ backgroundPosition: `${background_pos}px 0` }}
    >
      <Layer>
        <Rect
          id="player"
          stroke="black"
          strokeWidth={1}
          x={fight_position[0]}
          y={fight_position[1]}
        />

        <Image
          image={fighterImgRef.current}
          width={fighterImgRef.current.width}
          height={fighterImgRef.current.height}
          x={fight_position[0] - fighterImgRef.current.width / 2}
          y={fight_position[1] - fighterImgRef.current.height / 2}
        />
      </Layer>
      <Layer>
        {enemies.map((enemy, index) => (
          <Image
            image={enemyImgRef.current}
            width={enemyImgRef.current.width}
            height={enemyImgRef.current.height}
            key={index}
            id={`enemy_${index}`}
            fill="black"
            x={enemy[0]}
            y={enemy[1]}
          />
        ))}
        {laser_pos.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="blue"
            width={20}
            height={20}
            x={laser[0]}
            y={laser[1]}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export default App;
