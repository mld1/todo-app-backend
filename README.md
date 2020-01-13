Todo Application - Backend
This is the back end API of a Todo Application, built throughout the Tech Returners Your Journey Into Tech course. It is consumed by a front end React application, available here and connects to an RDS Database.

The hosted version of the application is available here: https://github.com/whatever-link-here.

Technology Used
This project uses the following technology:

Serverless Framework
JavaScript (ES2015+)
Express
SQL
Mysql library
AWS Lambda and API Gateway
AWS RDS
ESLint
Endpoints
The API exposes the following endpoints:

GET /tasks
https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/

Responds with JSON containing all tasks in the Database.

POST /tasks
https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks

Will create a new task when sent a JSON payload in the format:

{
"TaskID": 2,
"Completed": 1,
"DateCreated": "2019-06-21T00:00:00.000Z",
"DateDue": "2019-11-28T00:00:00.000Z",
"Text": "Karate chop plank of wood",
"UserID": 2
}
DELETE /tasks/:taskId
https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskId

Deletes the task of the given ID.

PUT /tasks/:taskId
https://cr5ghnlv41.execute-api.eu-west-2.amazonaws.com/dev/tasks/:taskId

Will update a task when sent a JSON payload in the format:
{

"TaskID": 2,
"Completed": 1,
"DateCreated": "2019-06-21T00:00:00.000Z",
"DateDue": "2019-11-28T00:00:00.000Z",
"Text": "Karate chop plank of wood",
"UserID": 2
}
