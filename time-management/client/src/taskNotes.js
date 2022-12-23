import { useState } from "react";

const url = "http://localhost:3001/api/task";
const headers = {
  "Content-Type": "application/json",
};

const API = {
  async create(task, content) {
    const res = await fetch(`${url}/${task}/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        task,
        content,
        time: new Date(),
      }),
    });
    const { result } = await res.json();
    return result;
  },

  async update(task, body) {
    const res = await fetch(`${url}/${task}/notes`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    const { result } = await res.json();
    return result;
  },

  async del(task, id) {
    const res = await fetch(`${url}/${task}/notes`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
    const { result } = await res.json();
    return result;
  },
};

const NewNote = (props) => {
  const [content, setContent] = useState("");
  const handleChange = (e) => setContent(e.target.value);
  const save = async (e) => {
    const result = await API.create(props.task, content);
    props.handleSave(result);
    setContent("");
  };

  return (
    <tr>
      <td></td>
      <td>
        <textarea cols={40} rows={10} value={content} onChange={handleChange} />
      </td>
      <td>
        <button onClick={save}>Save</button>
      </td>
      <td></td>
    </tr>
  );
};

const NoteRow = (props) => {
  const [content, setContent] = useState(props.note.content);
  const handleChange = (e) => setContent(e.target.value);
  const update = async (e) => {
    const { task } = props;
    const result = await API.update(task, { id: props.note.id, content });
    props.handleUpdate(result);
  };
  const del = async (e) => {
    if (window.confirm("Delete note?")) {
      const { task } = props;
      const result = await API.del(task, props.note.id);
      props.handleDelete(props.note.id);
    }
  };

  return (
    <tr>
      <td>{new Date(props.note.time).toLocaleString()}</td>
      <td>
        <textarea cols={40} rows={10} value={content} onChange={handleChange} />
      </td>
      <td>
        <button onClick={update}>Update</button>
      </td>
      <td>
        <button onClick={del}>Delete</button>
      </td>
    </tr>
  );
};

const TaskNotes = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const handleSave = (note) => {
    setNotes([...notes, note]);
  };

  const handleUpdate = (note) => {
    const oldNotes = [...notes];
    const find = oldNotes.find((n) => n.id == note.id);
    if (find) {
      find.content = note.content;
    }
    setNotes(oldNotes);
  };

  const handleDelete = (id) => {
    const oldNotes = [...notes];
    const index = oldNotes.findIndex((n) => n.id == id);
    if (index > -1) {
      oldNotes.splice(index, 1);
    }
    setNotes(oldNotes);
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Content</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((n) => (
          <NoteRow
            task={props.task}
            key={n.id}
            note={n}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
        <NewNote task={props.task} handleSave={handleSave} />
      </tbody>
    </table>
  );
};

export default TaskNotes;
