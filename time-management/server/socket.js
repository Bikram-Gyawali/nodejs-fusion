const {WebSocketServer, OPEN} = require('ws');class Socket {
    constructor() {
        this.wss = new WebSocketServer({port: 8080});
        this.wss.on('connection', ws => console.log('Connected!'));
    }    async sendTask(task) {
        this.wss.clients.forEach(client => {
            if (client.readyState === OPEN) {
                const data = {
                    type: 'task_start',
                    task
                };
                client.send(JSON.stringify(data));
            }
        });
    }
}module.exports = Socket;