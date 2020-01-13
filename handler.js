const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

app.use(cors());

//Allows Express to parse JSON data that is sent on the body of requests
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "todos"
});

app.get("/tasks", function(request, response) {
  connection.query("SELECT * FROM Task", function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: data
      });
    }
  });
});

app.delete("/tasks/:TaskID", function(request, response) {
  const id = request.params.TaskID;

  // Delete the task
  connection.query("DELETE FROM Task WHERE TaskID = ?", [id], err => {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).send("Successfully deleted task ID " + " " + id);
    }
  });
});

app.post("/tasks", function(request, response) {
  const task = request.body;
  // Create a new task
  task.Completed = false;
  const q = "INSERT INTO Task SET ?";
  connection.query(q, task, function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      task.taskId = data.insertId;
      response.status(201).send(task);
    }
  });
});

app.put("/tasks/:TaskID", function(request, response) {
  // Updating an existing task
  const task = request.body;
  const id = request.params.TaskID;
  const q = "UPDATE Task SET Completed = ? WHERE ? id = ?";
  connection.query(q, [task.Completed], id, function(err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
      task.Text;
    } else {
      response
        .status(205)
        .send("Updated a task with ID " + id + " " + task.text);
    }
  });
});

module.exports.tasks = serverless(app);
