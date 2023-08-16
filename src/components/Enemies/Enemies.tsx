import type { EnemyModel } from '$/commonTypesWithClient/models';
import Konva from 'konva';
import { createRef, useEffect, useRef, type RefObject } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type props = {
  enemies: EnemyModel[];
};

export const Enemies = ({ enemies }: props) => {
  const ufoRefs = useRef<RefObject<Konva.Image>[]>([]);

  const [enemyImage1] = useImage(staticPath.images.ufo_1_jpg);
  const [enemyImage2] = useImage(staticPath.images.ufo_2_PNG);
  const [enemyImage3] = useImage(staticPath.images.ufo_3_PNG);

  useEffect(() => {
    const anim = new Konva.Animation((layer) => {
      ufoRefs.current.forEach((ufoRef) => {
        if (ufoRef.current) {
          const radian = Math.floor(((layer?.time ?? 0) / 10 + ufoRef.current.x()) * Math.PI) / 100;
          ufoRef.current.offset({
            x: Math.cos(radian) * 5,
            y: Math.sin(radian) * 5,
          });
        }
      });
    }, ufoRefs.current[0]?.current?.getLayer());

    anim.start();

    return () => {
      anim.stop();
    };
  }, []);

  return (
    <>
      {enemies.map((enemy, i) => {
        ufoRefs.current[i] = createRef<Konva.Image>();
        return (
          <Image
            image={[enemyImage1, enemyImage2, enemyImage3][enemy.type - 1]}
            width={80}
            height={80}
            x={enemy.createdPosition.x - 40}
            y={enemy.createdPosition.y - 40}
            key={enemy.id}
            ref={ufoRefs.current[i]}
          />
        );
      })}
    </>
  );
};
