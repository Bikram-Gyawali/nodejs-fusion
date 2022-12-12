import { useState, useEffect } from "react";
import { isValidCron } from "cron-validator";
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

  const handleSave = (task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdate = (id, task) => {
    const oldTasks = [...tasks];
    const find = oldTasks.find((t) => t.id == id);
    if (find) {
      find.completed = task.completed;
      find.name = task.name;
      find.cron_string = task.cron_string;
    }
    setTasks(oldTasks);
  };

  const handleDelete = (id) => {
    const oldTasks = [...tasks];
    const index = oldTasks.findIndex((t) => t.id == id);
    if (index > -1) {
      oldTasks.splice(index, 1);
    }
    setTasks(oldTasks);
  };

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
      <tbody>
        {tasks.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
        <NewTask handleSave={handleSave} />
      </tbody>
    </table>
  );
};

const TaskRow = (props) => {
  const [task, setTask] = useState(props.task);

  const handleClick = (e) => setTask({ ...task, completed: !task.completed });

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const update = async (e) => {
    const { id, ...rest } = task;
    const result = await API.update(id, rest);
    props.handleUpdate(id, result);
  };

  const del = async (e) => {
    if (window.confirm(`Delete task: ${task.name}?`)) {
      const result = await API.del(task.id);
      props.handleDelete(task.id);
    }
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={handleClick}
        />
      </td>
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
          onClick={update}
          disabled={!task.name || !isValidCron(task.cron_string)}
        >
          Update
        </button>
      </td>
      <td>
        <button onClick={del}>Delete</button>
      </td>
    </tr>
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
