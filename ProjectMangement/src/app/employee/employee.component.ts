import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empImage:any = "../assets/images/employee.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
