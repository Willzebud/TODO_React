const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Jennessee94-",
  database: "todo",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// CREATE DATABASE todo;

// INSERT INTO task (task) VALUES ("MA SUPER TASK 2 ");

app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { text } = req.body;
  db.query("INSERT INTO todos (text) VALUES (?)", [text], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId, text, completed: false });
  });
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(204);
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ? AND", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// https://sequelize.org/docs/v6/getting-started/
