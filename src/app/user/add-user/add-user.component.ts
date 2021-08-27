import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private appService:AppService,
    private router:Router) { }

  erroMessage!:string;
  
  
//  User form Group
  userForm:FormGroup = this.fb.group({
    username:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmed:true
  })

  // Method to Add user
  addUser(){
    this.appService.enableLoader(true);
    this.userService.addUser(this.userForm.value).subscribe((data:User) => {
    if(data){
      this.router.navigate(['/user'])
    }
   });
  }

  //Method to get controls of user form
  get f(){return this.userForm.controls}

  ngOnInit(): void {
  
    
  }

}
