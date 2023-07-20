//ここにゲーム画面をつくる
import type { Enemy_Info } from '$/repository/Usecase/enemyUsecase';
import type { Laser_Info } from '$/repository/Usecase/laserUsecase';
import { player_info } from '$/repository/Usecase/playerUsecase';
import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './gradius_game_screen.module.css';
// import enemy01 from '../../../public/images/enemy01.png';
// import fighter from '../../../public/images/fighter.png';

const App = () => {
  const [fight_position, setfight_position] = useState<number[]>();
  const [enemieies_info, setenemieies_info] = useState<Enemy_Info[]>([]);
  const [laseies_info, setlaseies_info] = useState<Laser_Info[]>([]);
  const [background_pos, setbackground_pos] = useState(0);
  const [isFighterLoaded, setIsFighterLoaded] = useState(false);
  const fighterImgRef = useRef(new window.Image());
  const enemyImgRef = useRef(new window.Image());
  enemyImgRef.current.src = '/images/GAMIRASU.jpg';

  const fetchBord = async () => {
    const new_fighter_position = await apiClient.player.$get();
    const new_enemies_info = await apiClient.enemy.$get();
    const new_laseies_info = await apiClient.laser.$get();

    setfight_position(new_fighter_position);
    setenemieies_info(new_enemies_info);
    setlaseies_info(new_laseies_info);
    setbackground_pos((pre_background_pos) => pre_background_pos - 1);
  };

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
  if (!isFighterLoaded || !fight_position) return <Loading visible />;
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
          x={player_info.pos.x - fighterImgRef.current.width / 2}
          y={player_info.pos.y - fighterImgRef.current.height / 2}
        />
      </Layer>
      <Layer>
        {enemieies_info.map((enemy, index) => (
          <Image
            image={enemyImgRef.current}
            width={enemyImgRef.current.width}
            height={enemyImgRef.current.height}
            key={index}
            id={`enemy_${index}`}
            fill="black"
            x={enemy.pos.x}
            y={enemy.pos.y}
          />
        ))}
        {laseies_info.map((laser, index) => (
          <Rect
            key={index}
            id={`laser_${index}`}
            fill="blue"
            width={20}
            height={20}
            x={laser.pos.x}
            y={laser.pos.y}
          />
        ))}
      </Layer>
    </Stage>
  );
};
export default App;
