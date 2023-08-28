import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

const Boom = ({ position }: { position: number[] }) => {
  const imagePaths = [
    staticPath.images.Effect.boom.boom1_png,
    staticPath.images.Effect.boom.boom2_png,
    staticPath.images.Effect.boom.boom3_png,
    staticPath.images.Effect.boom.boom4_png,
    staticPath.images.Effect.boom.boom5_png,
    staticPath.images.Effect.boom.boom6_png,
  ];

  const [boomImage1] = useImage(imagePaths[0]);
  const [boomImage2] = useImage(imagePaths[1]);
  const [boomImage3] = useImage(imagePaths[2]);
  const [boomImage4] = useImage(imagePaths[3]);
  const [boomImage5] = useImage(imagePaths[4]);
  const [boomImage6] = useImage(imagePaths[5]);

  const boomImages = [boomImage1, boomImage2, boomImage3, boomImage4, boomImage5, boomImage6];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const updateBoomImage = () => {
      if (currentImageIndex + 1 === boomImages.length) {
        clearInterval(intervalId);
        return;
      }
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    const intervalId = setInterval(updateBoomImage, 75);

    return () => {
      clearInterval(intervalId);
    };
  }, [boomImages.length, currentImageIndex]);

  return (
    <Image
      image={boomImages[currentImageIndex]}
      x={position[0]}
      y={position[1]}
      width={100}
      height={100}
    />
  );
};

export default Boom;
