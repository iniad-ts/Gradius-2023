import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import App from 'src/konva/konva';

const Home = () => {
  const windowWidth = Number(window.innerWidth);
  const windowHeight = Number(window.innerHeight);

  //プレイヤーと弾敵をstateで管理
  const [newPlayerPosition, setNewPlayerPosition] = useState<PlayerModel[]>([]);
  const [newBulletPosition, setNewBulletPosition] = useState<BulletModel[]>([]);
  const [newEnemyPosition, setNewEnemyPosition] = useState<EnemyModel[]>([]);
  //apiを叩いてプレイヤーと銃敵の位置を取得stateにセット
  const getPosition = useCallback(async () => {
    const new_playerPosition = await apiClient.rooms.control.$get();
    const new_bulletPosition = await apiClient.rooms.gunPosition.$get();
    const new_enemyPosition = await apiClient.check.$get();

    ///当たり判定を行う
    // checkCollision(new_enemyPosition, new_bulletPosition);
    // checkCollision(new_enemyPosition, new_playerPosition);//一次的にコメントアウトしています。

    setNewPlayerPosition(new_playerPosition);
    setNewBulletPosition(new_bulletPosition);
    setNewEnemyPosition(new_enemyPosition);
  }, []);
  //仮の当たり判定関数
  const checkCollision = (hitlist1: EnemyModel[], hitlist2: number[][]) => {
    const list2Radius = 20; // list2 の固定の半径

    hitlist1.map((list1) => {
      hitlist2.map((list2: number[]) => {
        const distance1to2 = Math.sqrt(
          (list1.pos.x - list2[0]) ** 2 + (list1.pos.y - list2[1]) ** 2
        );
        if (distance1to2 < list1.radius + list2Radius) {
          apiClient.check.$post({ body: list1.id });
          console.log('フロントhit', list1.id);
        }
      });
    });
  };
  //配列用の当たり判定関数
  /* const checkCollision = (hitlist1: EnemyModel[], hitlist2: EnemyModel[]) => {
    hitlist1.map((list1) => {
      hitlist2.map((list2) => {
        const distance1to2 = Math.sqrt(
          (list1.pos.x - list2.pos.x) ** 2 + (list1.pos.y - list2.pos.y) ** 2
        );
        if (distance1to2 < list1.radius + list2.radius) {
          console.log('hit');
          apiClient.check.$post({ body: list1.id });
        }
      });
    });
  }; */

  //apiを叩く処理を100msごとに実行
  useEffect(() => {
    const cancelId = setInterval(getPosition, 50);

    return () => {
      clearInterval(cancelId);
    };
  }, [getPosition, newPlayerPosition]);
  //mapで展開してひとつずつ描画

  return (
    <>
      {/* <div className={styles.container}>
        {/* 下記は簡易的に作ったモノです。削除してもらってかまいません */}
      {/* <h1 className={styles.word}>ここはgamescreenです</h1> */}
      <App />
      {/* </div> */}
    </>
  );
};

export default Home;
