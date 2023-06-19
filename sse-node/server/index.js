const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const PORT = 3000;

let clients = [];
let facts = [];



function eventsHandler(request, response, next){
    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    }
    response.writeHead(200, headers)
    const data = `data: ${JSON.stringify(facts)}\n\n`
    response.write(data);

const clientId = Date.now();

const newClient = {
    id : clientId,
    response,
}

clients.push(newClient);

request.on('close', () => {
    console.log(`Client ${clientId} disconnected`)
    clients = clients.filter(client => client.id !== clientId)
})
}

function sendEventsToAllClients(){
    clients.forEach(client => {
        client.response.write(`data: ${JSON.stringify(facts)}\n\n`)
    })
}

async function addNewFact(request, response, next){
    const newFact = request.body;
    facts.push(newFact);
    response.json(newFact);
    return sendEventsToAllClients(newFact);
}

app.get('/status', (request, response) => response.json({clients: clients.length})); // to know how many clients are connected
app.get("/events", eventsHandler);  // endpoint to register for updates
app.post("/addFact", addNewFact); // endpoint for new facts


app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})