import express from "express";
import RabbitMQClient from "./rabbitmq/client";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/operate", async (req, res, next) => {
  console.log(req.body);
  const response = await RabbitMQClient.produce(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  RabbitMQClient.initialize();
});
