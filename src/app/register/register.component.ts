import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private appService:AppService) { }

  // Register Form Model
  register = {
    username:'',
    email:'',
    password:'',
    confirmed:true
  }
  
  //Method for User Register 
  save(formvalues:any){
    this.appService.enableLoader(true);
    this.userService.registerUser(formvalues).subscribe()
  }
 
  ngOnInit(): void {
  }
  ngOnDestroy(){
    //Clear toaster when component Destroys
    this.appService.clearToaster();
  }
}
