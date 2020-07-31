import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import appRoutes from './routerConfig'
import { HttpClientModule } from '@angular/common/http'
import { ChartService } from './chart.service';

import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { TeamComponent } from './team/team.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    TeamComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
