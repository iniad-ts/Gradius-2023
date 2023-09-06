import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

type Size = {
  width: number;
  height: number;
};

const QRCode = () => {
  const [ip, setIp] = useState<string>('');
  const [isSimple, setIsSimple] = useState<boolean>(true);
  const [windowSize, setWindowSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { Canvas } = useQRCode();

  const fetchIp = async () => {
    const res = await apiClient.ip.$get();
    setIp(res);
  };

  useEffect(() => {
    fetchIp();

    const fetchRequestId = requestAnimationFrame(fetchIp);

    return () => {
      cancelAnimationFrame(fetchRequestId);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.bg} style={{ opacity: isSimple ? '0' : '1' }} />
      {ip !== '' && (
        <Canvas
          text={`${ip}/login`}
          options={{
            type: 'image/png',
            quality: 0.3,
            errorCorrectionLevel: 'H',
            width: Math.min(windowSize.width, windowSize.height) * 0.64,
          }}
        />
      )}
      <div onClick={() => setIsSimple(!isSimple)} className={styles.button}>
        <div style={{ left: isSimple ? '0.6svmin' : 'calc(100% - 2.8svmin)' }} />
      </div>
    </div>
  );
};

export default QRCode;
