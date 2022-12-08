const url = 'http://localhost:3001/api/task';
const headers = {
    'Content-Type': 'application/json'
};const API = {
    async getAll() {
        const res = await fetch(`${url}/all`, {method: 'GET', headers});
        const {result} = await res.json();
        return result;
    },    async create(body) {
        const res = await fetch(url, {method: 'POST', headers, body: JSON.stringify(body)});
        const {result} = await res.json();
        return result;
    },    async update(id, body) {
        const res = await fetch(`${url}/${id}`, {method: 'PUT', headers, body: JSON.stringify(body)});
        const {result} = await res.json();
        return result;
    },    async del(id) {
        const res = await fetch(`${url}/${id}`, {method: 'DELETE', headers});
        const {result} = await res.json();
        return result;
    }
}