const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const path = require("path");

const db = new Sequelize("task_schedule", "username", "password", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const Task = db.define(
  "task",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    cron_string: Sequelize.STRING,
    completed: Sequelize.BOOLEAN,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const TaskNote = db.define(
  "task_note",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task: Sequelize.INTEGER,
    time: Sequelize.DATE,
    content: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const TaskFunctions = {
  async getAll() {
    return Task.findAll();
  },

  async get(id) {
    return Task.findByPk(id);
  },

  async create(data) {
    const task = Task.create({
      name: data.name,
      cron_string: data.cron_string,
    });
    return task;
  },

  async update(id, data) {
    const task = await Task.findByPk(id);
    task.name = data.name || task.name;
    task.cron_string = data.cron_string || task.cron_string;
    task.completed = [true, false].includes(data.completed)
      ? data.completed
      : task.completed;
    await task.save();
    return task;
  },

  async del(id) {
    const task = await Task.destroy({ where: { id } });
    return id;
  },

};

const PORT = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/../client")));

app.get("/api/test", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/task/all", async (req, res) => {
  const result = await TaskFunctions.getAll();
  res.send({ result });
});

app.get("/api/task/:id", async (req, res) => {
  const result = await TaskFunctions.get(req.params.id);
  res.send({ result });
});

app.post("/api/task", async (req, res) => {
  const result = await TaskFunctions.create(req.body);
  res.send({ result });
});

app.put("/api/task/:id", async (req, res) => {
  const result = await TaskFunctions.update(req.params.id, req.body);
  res.send({ result });
});

app.delete("/api/task/:id", async (req, res) => {
  const result = await TaskFunctions.del(+req.params.id);
  res.send({ result });
});

app.post('/api/task', async (req,res) => {
  const result = await TaskFunctions.create(req.body);
  await taskSchedule.rebuildSchedule();
  res.send({result});
});

app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`);
});

