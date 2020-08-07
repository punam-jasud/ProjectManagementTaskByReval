import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';
import * as moment from 'moment';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private svc: ChartService) { }

  ngOnInit(): void {
    //Declare arrays to extract data
    var projects = [];
    var totalNoEmp = [];
    var projectTasks = [];
    var noOfDays = [];
    var Xdates = [];
    var color = ['#FF0000', '#00FF00', '#0000FF', '#B70131', '#FF619B', '#61E6A8', '#FFFB03'];

    //Call to api to fetch data from backend
    let res = this.svc.getData();
    res.subscribe(function (data) {
      projects = data[0];
      totalNoEmp = data[1];
      projectTasks = data[2];
      noOfDays = data[3];
      Xdates = data[4];

      console.log(projects);
      console.log(totalNoEmp);
      console.log(projectTasks);
      console.log(noOfDays);
      console.log(Xdates);

      //Function to Find All Dates Between Two Dates
      function getDates(sDate, eDate) {
        let dates = [];
        var currentDate = moment(sDate);
        var stopDate = moment(eDate);
        while (currentDate <= stopDate) {
          dates.push(moment(currentDate).format('YYYY-MM-DD'))
          currentDate = moment(currentDate).add(1, 'days');
        }
        return dates;
      }

      //store startDate and EndDate of x-axis dates in proper format
      var sDate = moment(Xdates[0].startDate).format('YYYY-MM-DD');
      var eDate = moment(Xdates[0].EndDate).format('YYYY-MM-DD');
      //Get X - axis Dates Array
      Xdates = getDates(sDate, eDate);
      console.log(Xdates);


      //Find All Projects
      for (var i = 0; i < projects.length; i++) {
        projects[i] = projects[i].ProjectName;
      }

      //Create Dynamic Dataset for Stacked Bar Chart
      var myDataset = [];
      for (var i = 0; i < projects.length; i++) {

        var pDates = [], myData = [];
        var pCost = new Map();


        for (var t = 0; t < projectTasks.length; t++) {

          if (projectTasks[t].ProjectName == projects[i]) {

            //store TaskCreateDate and TaskDueDate of each task in proper format
            var sDate = moment(projectTasks[t].TaskCreateDate).format('YYYY-MM-DD');
            var eDate = moment(projectTasks[t].TaskDueDate).format('YYYY-MM-DD');

            //Get all dates between taskCreatedate and taskDueDate 
            var taskDates = getDates(sDate, eDate);


            for (var m = 0; m < taskDates.length - 1; m++) {

              pDates[taskDates[m]] = taskDates[m];
              if (pCost.has(taskDates[m])) {
                let prevValue = pCost.get(taskDates[m]);
                let newValue = prevValue + projectTasks[t].TaskCost
                pCost.set(taskDates[m], newValue);
              }
              else {
                pCost.set(taskDates[m], projectTasks[t].TaskCost);
              }

            }
          }
          else {
            continue;
          }

        }
        var mapAsc = new Map([...pCost.entries()].sort());
        var dates = [], j = 0;
        for (let key of mapAsc.keys()) {
          dates[j++] = key;
        }

        var empCost = [], k = 0;
        for (let value of mapAsc.values()) {
          empCost[k++] = value;
        }


        console.log(dates);
        console.log(empCost);

        //Calculate here daily cost for each project
        var projectDailyCost = [];
        for(let c = 0 ; c < empCost.length; c++)
        {
          projectDailyCost[c] = Math.round((empCost[c]/totalNoEmp[i].No_of_Employee) * noOfDays[i].No_of_Days);
        }

        console.log(projectDailyCost);


        var xAxisData = [], p = 0;
        for (var x = 0; x < Xdates.length; x++) {
          if (Xdates[x] == dates[p]) {
            xAxisData[x] = projectDailyCost[p];
            p++;
          }
          else {
            xAxisData[x] = 0;
          }
        }
        myData[i] = xAxisData;
        console.log(myData[i]);

        myDataset[i] = {
          label: projects[i],
          data: myData[i],
          backgroundColor: color[i]
        }
      }
      var myChart = new Chart("myCanvas", {
        type: 'bar',
        data: {
          labels: Xdates,
          datasets: myDataset
        },
        options: {
          responsive: true,
          animation: {
            duration: 0
          },
          hover: {
            animationDuration: 0
          },
          responsiveAnimationDuration: 0,
          title: {
            display: true,
            position: "top",
            text: "Stacked Bar Chart Indicating Project's Daily Costing",
            fontSize: 18,
            fontColor: "#DA5C4A"
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#111",
              fontSize: 14
            }
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                scaleLabel:
                {
                  display: true,
                  labelString: 'Dates',
                  fontColor: '#DA5C4A',
                  fontSize: 15
                },
                ticks:
                {
                  fontColor: "#000000",
                }
              }],
            yAxes: [
              {
                stacked: true,
                scaleLabel:
                {
                  display: true,
                  labelString: 'Project Cost',
                  fontColor: '#DA5C4A',
                  fontSize: 15
                },
                ticks:
                {
                  fontColor: "#000000",
                }
              }]
          }
        }

      });
    });
  }
}






















/*
      import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';
import * as moment from 'moment';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private svc: ChartService) { }

  ngOnInit(): void {
    //Declare arrays to extract data
    var projects = [];
    var totalNoEmp = [];
    var projectTasks = [];
    var noOfDays = [];
    var Xdates = [];
    var color = ['#FF0000', '#00FF00', '#0000FF', '#B70131', '#FF619B', '#61E6A8', '#FFFB03'];

    //Call to api to fetch data from backend
    let res = this.svc.getData();
    res.subscribe(function (data) {
      projects = data[0];
      totalNoEmp = data[1];
      projectTasks = data[2];
      noOfDays = data[3];
      Xdates = data[4];

      console.log(projects);
      console.log(totalNoEmp);
      console.log(projectTasks);
      console.log(noOfDays);
      console.log(Xdates);

      //Function to Find All Dates Between Two Dates
      function getDates(sDate, eDate) {
        let dates = [];
        var currentDate = moment(sDate);
        var stopDate = moment(eDate);
        while (currentDate <= stopDate) {
          dates.push(moment(currentDate).format('YYYY-MM-DD'))
          currentDate = moment(currentDate).add(1, 'days');
        }
        return dates;
      }

      //store startDate and EndDate of x-axis dates in proper format
      var sDate = moment(Xdates[0].startDate).format('YYYY-MM-DD');
      var eDate = moment(Xdates[0].EndDate).format('YYYY-MM-DD');
      //Get X - axis Dates Array
      Xdates = getDates(sDate, eDate);
      console.log(Xdates);


      //Find All Projects
      for (var i = 0; i < projects.length; i++) {
        projects[i] = projects[i].ProjectName;
      }

      //Create Dynamic Dataset for Stacked Bar Chart
      var myDataset = [];
      for (var i = 0; i < projects.length; i++) {

        var pDates = [], myData = [];
        var pCost = new Map();


        for (var t = 0; t < projectTasks.length; t++) {

          if (projectTasks[t].ProjectName == projects[i]) {

            //store TaskCreateDate and TaskDueDate of each task in proper format
            var sDate = moment(projectTasks[t].TaskCreateDate).format('YYYY-MM-DD');
            var eDate = moment(projectTasks[t].TaskDueDate).format('YYYY-MM-DD');

            //Get all dates between taskCreatedate and taskDueDate 
            var taskDates = getDates(sDate, eDate);


            for (var m = 0; m < taskDates.length - 1; m++) {

              pDates[taskDates[m]] = taskDates[m];
              if (pCost.has(taskDates[m])) {
                let prevValue = pCost.get(taskDates[m]);
                let newValue = prevValue + projectTasks[t].TaskCost
                pCost.set(taskDates[m], newValue);
              }
              else {
                pCost.set(taskDates[m], projectTasks[t].TaskCost);
              }

            }
          }
          else {
            continue;
          }

        }
        var mapAsc = new Map([...pCost.entries()].sort());
        var dates = [], j = 0;
        for (let key of mapAsc.keys()) {
          dates[j++] = key;
        }

        var empCost = [], k = 0;
        for (let value of mapAsc.values()) {
          empCost[k++] = value;
        }


        console.log(dates);
        console.log(empCost);

        //Calculate here daily cost


        var xAxisData = [], p = 0;
        for (var x = 0; x < Xdates.length; x++) {
          if (Xdates[x] == dates[p]) {
            xAxisData[x] = empCost[p];
            p++;
          }
          else {
            xAxisData[x] = 0;
          }
        }
        myData[i] = xAxisData;
        console.log(myData[i]);

        myDataset[i] = {
          label: projects[i],
          data: myData[i],
          backgroundColor: color[i]
        }
      }
      var myChart = new Chart("myCanvas", {
        type: 'bar',
        data: {
          labels: Xdates,
          datasets: myDataset
        },
        options: {
          responsive: true,
          animation: {
            duration: 0
          },
          hover: {
            animationDuration: 0
          },
          responsiveAnimationDuration: 0,
          title: {
            display: true,
            position: "top",
            text: "Stacked Bar Chart Indicating Project's Daily Costing",
            fontSize: 18,
            fontColor: "#DA5C4A"
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#111",
              fontSize: 14
            }
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                scaleLabel:
                {
                  display: true,
                  labelString: 'Dates',
                  fontColor: '#DA5C4A',
                  fontSize: 15
                },
                ticks:
                {
                  fontColor: "#000000",
                }
              }],
            yAxes: [
              {
                stacked: true,
                scaleLabel:
                {
                  display: true,
                  labelString: 'Project Cost',
                  fontColor: '#DA5C4A',
                  fontSize: 15
                },
                ticks:
                {
                  fontColor: "#000000",
                }
              }]
          }
        }

      });
    });
  }
}

*/




































































































