import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import type { BulletModelWithPosition } from '$/usecase/bulletUseCase';
import { useEffect, useRef, useState } from 'react';
import { Circle, Image, Layer, Stage } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';

const Game = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModelWithPosition[]>([]);
  const [shipImage] = useImage(staticPath.images.spaceship_png);
  const [enemieShipImage] = useImage(staticPath.images.enemie_spaceship_png);

  const BackgroundImage = () => {
    const [image] = useImage(staticPath.images.space_background_png);
    const [pos, setPos] = useState(0);
    const imageWidth = image ? image.naturalWidth : 0;
    const imageHeight = image ? image.naturalHeight : 0;
    const aspectRatio = imageWidth / imageHeight;
    const viewportHeight = window.innerHeight;
    const viewportWidth = viewportHeight * aspectRatio;

    useEffect(() => {
      const animate = () => {
        setPos((oldPos) => (oldPos - 2 <= -viewportWidth ? 0 : oldPos - 2));
        requestAnimationFrame(animate);
      };
      animate();
    }, [viewportWidth]);

    return (
      <>
        <Image image={image} x={pos} width={viewportWidth} height={viewportHeight} />
        <Image
          image={image}
          x={pos + viewportWidth}
          width={viewportWidth}
          height={viewportHeight}
        />
      </>
    );
  };

  const backgroundImageRef = useRef<JSX.Element | null>(null);

  if (!backgroundImageRef.current) {
    backgroundImageRef.current = <BackgroundImage />;
  }

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get();
    if (res !== null) {
      setPlayers(res);
    }
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    if (res !== null) {
      setEnemies(res);
    }
  };

  const fetchBullets = async () => {
    const res = await apiClient.bullet.$get();
    if (res !== null) {
      setBullets(res);
    }
  };
  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchPlayers();
      fetchEnemies();
      fetchBullets();
    });
    return () => cancelAnimationFrame(cancelId);
  });
  return (
    <div>
      <Stage width={1920} height={1080}>
        <Layer>{backgroundImageRef.current}</Layer>
        <Layer>
          {bullets.map((bullet) => (
            <Circle
              fill="red"
              radius={bullet.radius}
              x={bullet.position.x}
              y={bullet.position.y}
              key={bullet.id}
            />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <Image
              image={shipImage}
              width={player.radius * 2}
              height={player.radius * 2}
              rotation={90}
              x={player.position.x + player.radius}
              y={player.position.y - player.radius}
              key={player.id}
            />
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Image
              image={enemieShipImage}
              width={enemy.radius * 2}
              height={enemy.radius * 2}
              rotation={-90}
              x={enemy.position.x + enemy.radius}
              y={enemy.position.y - enemy.radius}
              key={enemy.id}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
