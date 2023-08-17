import type { TaskModel } from '$/commonTypesWithClient/models';
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
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;
  const [gradius, setGradius] = useState([0, 0]);
  const [enemy, setEnemy] = useState([1000, 500]);
  const [gradiusBullet, setGradiusBullet] = useState([gradius[0] + 50, gradius[1] + 25]);

    await apiClient.tasks.post({ body: { label } });
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
  const updateGradiusBullet = async () => {
    setGradiusBullet((prev) => {
      if (prev[0] < 1280) {
        return [prev[0] + 10, prev[1]];
      } else {
        return prev;
      }
    });
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

      <form style={{ textAlign: 'center', marginTop: '80px' }} onSubmit={createTask}>
        <input value={label} type="text" onChange={inputLabel} />
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
      <Stage width={1920} height={1080}>
        <Layer>
          <Rect stroke="black" strokeWidth={1} x={0} y={0} width={1280} height={720} />
          <Rect x={gradius[0]} y={gradius[1]} width={50} height={50} fill="red" />
          <Rect x={enemy[0]} y={enemy[1]} width={50} height={50} fill="green" />
          <Circle x={gradiusBullet[0]} y={gradiusBullet[1]} radius={10} fill="blue" />
        </Layer>
      </Stage>
      ;
    </>
  );
};

export default Home;
