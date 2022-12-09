import { useState, useEffect } from "react";
import {isValidCron} from 'cron-validator';
const url = "http://localhost:3001/api/task";
const headers = {
  "Content-Type": "application/json",
};
const API = {
  async getAll() {
    const res = await fetch(`${url}/all`, { method: "GET", headers });
    const { result } = await res.json();
    return result;
  },
  async create(body) {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const { result } = await res.json();
    return result;
  },
  async update(id, body) {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    const { result } = await res.json();
    return result;
  },
  async del(id) {
    const res = await fetch(`${url}/${id}`, { method: "DELETE", headers });
    const { result } = await res.json();
    return result;
  },
};

const TaskTable = (props) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function getTasks() {
      const data = await API.getAll();
      setTasks(data);
    }
    getTasks();
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Completed</th>
          <th>Name</th>
          <th>Cron String</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

const NewTask = (props) => {
  const [task, setTask] = useState({
    name: "",
    cron_string: "",
    completed: false,
  });
  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });
  const save = async (e) => {
    const result = await API.create(task);
    props.handleSave(result);
    setTask({ name: "", cron_string: "", completed: false });
  };
  return (
    <tr>
      <td></td>
      <td>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="cron_string"
          value={task.cron_string}
          onChange={handleChange}
        />
      </td>
      <td>
        <button
          onClick={save}
          disabled={!task.name || !isValidCron(task.cron_string)}
        >
          Save
        </button>
      </td>
      <td></td>
    </tr>
  );
};
export default TaskTable;
