const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

// parse application/json
app.use(bodyparser.json());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//create database connection
var mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectmanagement',
    insecureAuth: true,
    multipleStatements: true,
    timezone: 'utc'
})

//connect to database
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Database Connection Successfull!!");
    }
    else {
        console.log("Database Connection Failed!!\nError: " + JSON.stringify(err, undefined, 2));
    }
})
//Server listening
app.listen(3000), console.log("Express Server is Running at Port No : 3000");

app.get('/api/getData', (req, res) => {
    /*************************************SQL Queries to Fetch Data**************************/
    //Fetch Projects - select ProjectName from project;
    //No_of_Employee - select count(EmployeeID) as No_of_Employee from team_member group by TeamCode;
    //Fetch Tasks , CreateDate , EndDate - select project.ProjectName ,member_task.TaskName , sum(EmployeeBillingRate) as TaskCost ,TaskCreateDate , TaskDueDate from project, member_task,employee ,task where member_task.EmployeeID = employee.EmployeeID and member_task.ProjectCode = project.ProjectCode and member_task.TaskName = task.TaskName group by member_task.TaskName; 
    //Fetch No_of_Days - select DATEDIFF(max(TaskDueDate),min(TaskCreateDate)) as No_of_Days from task group by ProjectCode;
    //Fetch x-axis start & end dates - select min(TaskCreateDate) as startDate,max(TaskDueDate)as EndDate from task;

    var sql = 'select ProjectName from project;select count(EmployeeID) as No_of_Employee from team_member group by TeamCode;select project.ProjectName ,member_task.TaskName , sum(EmployeeBillingRate) as TaskCost ,TaskCreateDate , TaskDueDate from project, member_task,employee ,task where member_task.EmployeeID = employee.EmployeeID and member_task.ProjectCode = project.ProjectCode and member_task.TaskName = task.TaskName group by member_task.TaskName; select DATEDIFF(max(TaskDueDate),min(TaskCreateDate)) as No_of_Days from task group by ProjectCode;select min(TaskCreateDate) as startDate,max(TaskDueDate)as EndDate from task;';

    mysqlConnection.query(sql, (err, result, fields) => {
        if (!err) {

            res.send(result);
            console.log(result[0]);       // Column1 as a result
            console.log(result[1]);
            console.log(result[2]);
            console.log(result[3]);
            console.log(result[4]);
        }
        else {
            console.log(err);
        }

    })
})

