import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const QRCode = () => {
  const { Canvas } = useQRCode();
  const [url, setUrl] = useState<string>('http://${ip}:3000/controller/login');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const _92vmin = Math.min(width, height) * 0.92;

  const fetchUrl = async () => {
    const res = await apiClient.ip.$get();
    if (res !== null) {
      setUrl(`http://${res}:3000/controller/login`);
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    fetchUrl();
  }, []);

  return (
    <div className={styles.code}>
      <Canvas text={url} options={{ width: _92vmin }} />
    </div>
  );
};

export default QRCode;
