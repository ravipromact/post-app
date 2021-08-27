import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { AppService } from '../shared/app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  //Model for Login form
  login = {
    email:'',
    password:''
  }

  constructor(private userService:UserService,
    private appService:AppService, 
    private router:Router) { }
 

  // Login Method
  loginUser(email:string,password:string){
    this.appService.enableLoader(true);
    this.userService.loginUser(email,password).subscribe((data:any) => {
      if(data !== undefined){
        this.router.navigate(['user']);
      }
  });
  
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    //Clear toaster when component Destroys
    this.appService.clearToaster();
  }
  

}
