import { useState, useEffect } from "react";
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
export default TaskTable;
