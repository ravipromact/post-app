import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  constructor(private route:ActivatedRoute, 
    private userService:UserService,
    private router:Router,
    private fb:FormBuilder,
    private appService:AppService) { }

  userDetails!:boolean;

  // Edit user form Group
  userEditForm = this.fb.group({
    id:'',
    username:['',Validators.required],
    email:['',[Validators.required, Validators.email]]
  })

  //Method to get controls of user form
  get f(){return this.userEditForm.controls}

  //Http Method to update user values
  updateUser(){
    this.appService.enableLoader(true);
    this.userService.updateUser(this.userEditForm.value).subscribe((response) =>{      
      if(response){
        this.appService.enableLoader(false)
        setTimeout(()=>{this.router.navigate(['user']);},1000)
      }
    })
  }

  //Method to fetch user details
  getUser(){
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if(id){
        this.userService.getUser(id).subscribe((user:any) =>{
          if(user){
            this.userDetails = true;
            this.userEditForm.patchValue({
              id:user.id,
              username:user.username,
              email:user.email
            })
          }else{
           this.userDetails = true;
          }
        })
      }
    })
  }

  
  ngOnInit(): void {
    this.getUser();
  }

}
