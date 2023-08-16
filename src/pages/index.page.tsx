import type { RoomModel, TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import Link from 'next/link';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const [label, setLabel] = useState('');
  const [panel, setPanel] = useState('1');
  const [rooms, setRooms] = useState<RoomModel[] | undefined>(undefined);
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const inputPanel = (e: ChangeEvent<HTMLSelectElement>) => {
    setPanel(e.target.value);
  };

  //部屋を読み込む
  const fetchRooms = async () => {
    const rooms = await apiClient.rooms.$get().catch(returnNull);

    if (rooms !== null) setRooms(rooms);
  };

  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  //部屋を作る
  const createRoom = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    const roomData: Partial<RoomModel> = {
      roomName: label,
      screen: Number(panel),
    };

    await apiClient.create.post({ body: roomData });
    setLabel('');
    await fetchRooms();
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } });
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete();
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    fetchRooms();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <form style={{ textAlign: 'center', marginTop: '40px' }} onSubmit={createRoom}>
        <input
          className={styles.textbox001}
          value={label}
          type="text"
          onChange={inputLabel}
          placeholder="ルーム名を入力してください"
        />
        {/* 1~8の数字を選択できる */}
        <label className={styles.selectbox006}>
          <select name="number" onChange={inputPanel}>
            <option value="1">1画面</option>
            <option value="2">2画面</option>
            <option value="3">3画面</option>
            <option value="4">4画面</option>
            <option value="5">5画面</option>
            <option value="6">6画面</option>
            <option value="7">7画面</option>
            <option value="8">8画面</option>
          </select>
        </label>
        <input type="submit" value="ADD" />
      </form>
      {rooms ? (
        <div>
          {rooms.map((room) => (
            <Link href={`/${room.roomId}`} key={room.roomId}>
              <div className={styles.roomlist}>
                <div className={styles.roomname}>{room.roomName}</div>
                <div className={styles.screencount}>{room.screen}画面</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>No rooms found.</div>
      )}
    </>
  );
};

export default Home;
