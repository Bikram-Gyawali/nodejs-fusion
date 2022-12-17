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
