import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(private appService:AppService,private router:Router) {

    //Clear toaster on route change
    this.router.events.subscribe((event) =>{
      if(event instanceof NavigationStart){
        this.appService.clearToaster();
      }
    })
   }

  ngOnInit(): void {
    localStorage.removeItem('postId')
  }
}
