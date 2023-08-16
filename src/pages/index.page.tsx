import type { RoomModel, TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
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
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createRoom = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    const roomData: Partial<RoomModel> = {
      roomName: label,
      screen: Number(panel),
    };

    await apiClient.create.post({ body: roomData });
    setLabel('');
    await fetchTasks();
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
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        Welcome to frourio!
      </div>

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createRoom}>
        <input value={label} type="text" onChange={inputLabel} />
        {/* 1~8の数字を選択できる */}
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
        <input type="submit" value="ADD" />
      </form>
      <ul className={styles.tasks}>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
              <span>{task.label}</span>
            </label>
            <input
              type="button"
              value="DELETE"
              className={styles.deleteBtn}
              onClick={() => deleteTask(task)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
