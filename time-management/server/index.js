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
const PORT = 3001;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/../client")));
app.get("/api/test", (req, res) => {
  res.send("Hello world!");
});
app.listen(PORT, () => {
  console.log(`App is live on port ${PORT}`);
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
    },    async get(id) {
        return Task.findByPk(id);
    },    async create(data) {
        const task = Task.create({
            name: data.name,
            cron_string: data.cron_string
        });
        return task;
    },    async update(id, data) {
        const task = await Task.findByPk(id);
        task.name = data.name || task.name;
        task.cron_string = data.cron_string || task.cron_string;
        task.completed = [true, false].includes(data.completed) ? data.completed : task.completed;
        await task.save();
        return task;
    },    async del(id) {
        const task = await Task.destroy({where: {id}});
        return id;
    }
}