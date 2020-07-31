import { Routes } from '@angular/router'
import { EmployeeComponent } from './employee/employee.component';
import { TeamComponent } from './team/team.component';
import { ProjectComponent } from './project/project.component';
import { Component } from '@angular/core';

const appRoutes : Routes = [
   { path : 'employee',
     component:  EmployeeComponent   
   },
   { path : 'team',
     component:  TeamComponent   
   },
   { path : 'project',
     component:  ProjectComponent   
   }
];

export default appRoutes;