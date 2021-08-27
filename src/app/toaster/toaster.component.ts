import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { UserService } from '../user/user.service';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  animations: [
    trigger('toasterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class ToasterComponent implements OnInit {

  constructor(private userService:UserService,private appService:AppService) { }
  showToaster:boolean = false;
  responseType:string | undefined;
  toasterMessage:string | undefined;
  toasterType:string | undefined;
  ngOnInit(): void {
    //Subscribe to toaster observable
    this.appService.response.subscribe((response:string) => {
      this.responseType = response;
      if((response === 'failed') || response === 'success' || response === 'info'){
        this.showToaster = true;
      }else{
       this.showToaster = false;
      }

    })
    this.appService.currenToasterMessage.subscribe((value:string) => {
      this.toasterMessage = value;
    })
  }
  // Method to dismiss Toaster
  clearToaster(){
    this.appService.clearToaster();
  }
  ngOnDestroy(){
     //Clear toaster when component Destroys
    this.clearToaster();
  }
  

}
