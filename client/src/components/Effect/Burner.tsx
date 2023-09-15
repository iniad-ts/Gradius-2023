import { SCREEN_WIDTH } from 'commonConstantsWithClient';
import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import type { Pos } from 'src/types/types';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type Props = {
  displayPosition: number;
  position: Pos;
  side: 'left' | 'right';
};

const Burner = ({ displayPosition, position, side }: Props) => {
  const imagePaths = [
    staticPath.images.Effect.burner.burner_1_png,
    staticPath.images.Effect.burner.burner_2_png,
    staticPath.images.Effect.burner.burner_3_png,
    staticPath.images.Effect.burner.burner_4_png,
  ];

  const [burnerImage1] = useImage(imagePaths[0]);
  const [burnerImage2] = useImage(imagePaths[1]);
  const [burnerImage3] = useImage(imagePaths[2]);
  const [burnerImage4] = useImage(imagePaths[3]);

  const burnerImages = [burnerImage1, burnerImage2, burnerImage3, burnerImage4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const relativePos = {
    x: position.x - displayPosition * SCREEN_WIDTH,
    y: position.y,
  };

  useEffect(() => {
    const updateBurnerImage = () => {
      if (currentImageIndex === burnerImages.length) {
        setCurrentImageIndex(0);
        return;
      }
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    const intervalId = setInterval(updateBurnerImage, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [burnerImages.length, currentImageIndex]);

  if (side === 'left') {
    return (
      <>
        <Image
          image={burnerImages[currentImageIndex]}
          x={relativePos.x}
          y={relativePos.y + 2}
          width={60}
          height={30}
          rotation={-180}
        />
        <Image
          image={burnerImages[currentImageIndex]}
          x={relativePos.x}
          y={relativePos.y + 38}
          width={60}
          height={30}
          rotation={-180}
        />
      </>
    );
  }
  if (side === 'right') {
    return (
      <>
        <Image
          image={burnerImages[currentImageIndex]}
          x={relativePos.x}
          y={relativePos.y - 35}
          width={60}
          height={30}
        />
        <Image
          image={burnerImages[currentImageIndex]}
          x={relativePos.x}
          y={relativePos.y}
          width={60}
          height={30}
        />
      </>
    );
  }
};

export default Burner;
