import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  constructor(private appService:AppService) { }
  loader:boolean = false;

  ngOnInit(): void {
    
    //Method to subscribe loader value
    this.appService.loaderStatus.subscribe((value:boolean) => {
      this.loader = value;
    })
  }

}
