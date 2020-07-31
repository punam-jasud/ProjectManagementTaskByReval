import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../chart.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private svc: ChartService) { }

  ngOnInit(): void {

    var projects = [];
    var totalNoEmp = [];
    var empDailyCost = [];
    var noOfDays = [];
    var projectDailyCost = [];
    var dates = ['2020/01/01', '2020/01/02', '2020/01/03','2020/01/04'];
    var color = ['#FF0000', '#00FF00', '#0000FF'];

    let res = this.svc.getData();
    res.subscribe(function (data) {
      projects = data[0];
      totalNoEmp = data[1];
      empDailyCost = data[2];
      noOfDays = data[3];
  
      for (var i = 0; i < projects.length; i++) {
        projects[i] = projects[i].ProjectName;
        projectDailyCost[i] = empDailyCost[i].Employees_Daily_Cost;
        //projectDailyCost[i] = ((empDailyCost[i].Employees_Daily_Cost) / (totalNoEmp[i].No_of_Employee)) * (noOfDays[i].No_of_Days);
      }
      // console.log(dailyCost);
      // console.log(projects);  
      
      var myDataset = [];
      for (var i = 0; i < projects.length; i++) {
        var myData = [];
        for (var j = 0; j < dates.length; j++) {
          myData[j] = projectDailyCost[i];
        }

        myDataset[i] = {
          label: projects[i],
          data: myData,
          backgroundColor: color[i]
        }

      }
      console.log(myDataset);

      var myChart = new Chart("myCanvas", {
        type: 'bar',
        data: {
          labels: dates,
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



