const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'projectmanagement',
    insecureAuth : true,
    multipleStatements: true,
    timezone: 'utc'
})

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Database Connection Successfull!!");
    }
    else {
        console.log("Database Connection Failed!!\nError: " + JSON.stringify(err, undefined, 2));
    }
})

app.listen(3000),console.log("Express Server is Running at Port No : 3000");

app.get('/api/getData',(req,res)=>{
    //Extract Projects , No_of_Employees , Employees_Daily_Cost , No_of_Days , x-axis Dates
    
    var sql = 'select ProjectName from project;select count(EmployeeID) as No_of_Employee from team_member group by TeamCode;select sum(EmployeeBillingRate) as Employees_Daily_Cost from employee , team_member where team_member.EmployeeID = employee.EmployeeID group by team_member.TeamCode;select  (max(TaskDueDate)-min(TaskCreateDate)) as No_of_Days from task group by ProjectCode;select min(TaskCreateDate) as startDate,max(TaskDueDate)as EndDate from task;';
    mysqlConnection.query(sql,(err,result,fields)=>{
        if(!err)
        {
            
            res.send(result);   
            console.log(result[0]);       // Column1 as a result
            console.log(result[1]);
            console.log(result[2]);
            console.log(result[3]);
            console.log(result[4]);
        }
        else
        {
            console.log(err1);
        }

    })
})

