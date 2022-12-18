import {useState, useEffect} from 'react';
const url = "http://localhost:3001/api/task";
const headers = {
  "Content-Type": "application/json",
};
const API = {
  async update(id, body) {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    const { result } = await res.json();
    return result;
  },
};


const Workspace = props => {
    const [task, setTask] = useState({});    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onmessage = e => {
            try {
                const data = JSON.parse(e.data);
                setTask(data.task);
            } catch (e) {
                console.log(e);
            }
        }
    }, []);    const handleClick = async e => {
        const {id, completed} = task;
        const result = await API.update(id, {completed: !completed});
        setTask({...task, completed: !completed});
    };    if (task.id) {
        return <>
            <table border='1'>
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='checkbox' name='completed' checked={task.completed} onChange={handleClick} /></td>
                        <td>{task.name}</td>
                    </tr>
                </tbody>
            </table>
        </>
    } else {
        return <b>Waiting for a task to start</b>
    }
}export default Workspace;

