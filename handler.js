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

app.delete("/tasks/:taskId", function(request, response) {
  const id = request.params.taskId;

  // Delete the task
  connection.query("DELETE FROM Task WHERE taskId = ?", [id], function(
    err,
    data
  ) {
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
  connection.query(
    "INSERT INTO Task (Completed, DateCreated, DateDue, Text, UserID), VALUES ?",
    [task.Completed, task.DateCreated, task.DateDue, task.Text, task.UserID],
    function(err, data) {
      if (err) {
        console.log("Error fetching tasks", err);
        response.status(500).json({
          error: err
        });
      } else {
      response
        .status(201)
        .send("Created a new task with text " + " " + task.Text);
    }
    });
});

app.put("/tasks/:taskId", function(request, response) {
  // Updating an existing task
  connection.query("INSERT INTO Task (Text), VALUES ?", [taskId], function(err, data) {
  const task = request.body;
  const id = request.params.taskId;
  response.status(200).send("Updated a task with ID " + id + " " + task.text);
});

module.exports.tasks = serverless(app);
