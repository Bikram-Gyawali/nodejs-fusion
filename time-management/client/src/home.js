import { useEffect, useState } from "react";
const url = "http://localhost:3001/api/task/today";
const headers = {
  "Content-Type": "applicaton/json",
};
const API = {
  async getToday() {
    const res = await fetch(`${url}`, {
      method: "GET",
      headers,
    });
    const { result } = await res.json();
    return result;
  },
};
const TaskRow = (props) => {
  const { task } = props;
  return (
    <tr>
      <td>{task.name}</td>
      <td>{task.cron_string}</td>
    </tr>
  );
};
const Home = (props) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function getTasks() {
      const data = await API.getToday();
      setTasks(data);
    }
    getTasks();
  }, []);
  return (
    <>
      <h1>Today's Incomplete Tasks</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cron String</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
