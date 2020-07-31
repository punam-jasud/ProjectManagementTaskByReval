import { Component } from '@angular/core';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectMangement';

  constructor(private svc : ChartService){
    console.log("Got the service!!");
  }

  ngOnInit(){
    // this.svc.getData();
  }
}
