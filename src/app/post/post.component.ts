import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  constructor(private appService:AppService,private router:Router) {
    this.router.events.subscribe((event) =>{
      if(event instanceof NavigationStart){
        this.appService.clearToaster();
        this.appService.enableLoader(false);
      }
    })
   }

  ngOnInit(): void {
    
  }

}
