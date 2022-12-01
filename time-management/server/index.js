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
