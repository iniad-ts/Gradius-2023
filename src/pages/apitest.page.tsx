import type { MoveInput } from '$/Usecase/playerUsecaseforDB';
import type { GameSessionModel, PlayerModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [gamesession, setGamesession] = useState<GameSessionModel | null>(null);
  const [player, setPlayer] = useState<PlayerModel | null>(null);

  const fetchGamesession = async () => {
    const gamesession = await apiClient.game.session.$get();
    setGamesession(gamesession);
  };
  const createGamesession = async () => {
    if (!user) return;
    //デバッグでstageIdをdebugにしてる(事前にdebugを用意しておかないとエラーになる)
    const gamesession = await apiClient.game.session.$post({
      body: { playerId: user.id, stageId: 'debug' },
    });
    setGamesession(gamesession);
  };
  //このAPIは仮置きでスコア加算してて、敵を倒した処理にスコア加算を入れるかも
  const addscore = async () => {
    if (!user) return;
    const score = await apiClient.game.session.score.$post({
      body: { playerId: user.id, score: 100 },
    });
  };

  const movePlayer = async () => {
    if (!user || !player) return;
    //"up"にMoveInput型をつけて
    const moveup = 'up' as MoveInput;
    const playermove = await apiClient.game.player.move.$post({
      body: { player, MoveInput: moveup },
    });
    setPlayer(playermove);
  };
  const createPlayer = async () => {
    if (!user) return;
    const player = await apiClient.game.player.$post({
      body: { userid: user.id, username: 'test' },
    });
    setPlayer(player);
  };

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!user) return;
      const player = await apiClient.game.player.$get();
      setPlayer(player);
    };
    const player = setInterval(() => {
      fetchPlayer();
    }, 1000);
    return () => clearInterval(player);
  }, [user]);
  useEffect(() => {
    const gamesession = setInterval(() => {
      fetchGamesession();
    }, 1000);
    return () => clearInterval(gamesession);
  }, []);

  if (!user) return <Loading visible />;

  return (
    <>
      {/* stageとかのデバッグ用データがないと動かないので、それらを生成するボタンを用意する */}
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <h2>Gamesession</h2>
          <button onClick={createGamesession}>セッション作る</button>
          <button onClick={addscore}>スコア加算</button>
        </div>
        <div className="flex">
          <h3>ゲームセッションID</h3>
          <p>{gamesession?.id}</p>
          <h3>プレイヤーID</h3>
          <p>{gamesession?.playerId}</p>
          <h3>ステージID</h3>
          <p>{gamesession?.stageId}</p>
          <h3>スコア</h3>
          <p>{gamesession?.score}</p>
          <h3>開始時刻</h3>
          <p>{gamesession?.startTime}</p>
        </div>
      </div>
      <br />
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <h2>Player</h2>
          <button onClick={createPlayer}>作成</button>
          <button onClick={movePlayer}>動かす(上)</button>
        </div>
        <div className="flex">
          <h3>プレイヤーID</h3>
          <p>{player?.id}</p>
          <h3>プレイヤー名</h3>
          <p>{player?.name}</p>
          <h3>プレイヤーのX座標</h3>
          <p>{player?.x}</p>
          <h3>プレイヤーのY座標</h3>
          <p>{player?.y}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
