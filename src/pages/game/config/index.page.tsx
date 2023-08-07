import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Config = () => {
  const [display, setDisplay] = useState<number>();

  const fetchDisplayNumber = async () => {
    const res = await apiClient.game.config.$get();
    if (res !== null) {
      setDisplay(res);
    }
  };

  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchDisplayNumber();
    });
    return () => cancelAnimationFrame(cancelId);
  }, []);

  const handleChangeDisplay = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayNumber = Math.max(Number(e.target.value), 1);
    setDisplay(displayNumber);
    await apiClient.game.config.$post({ body: { displayNumber } });
  };

  return (
    <div>
      <h1>Config</h1>
      <label>ディスプレイ枚数</label>
      <input type="number" value={display} onChange={handleChangeDisplay} min={1} max={10} />
      <Link href="/game">ゲーム画面 </Link>
    </div>
  );
};

export default Config;
