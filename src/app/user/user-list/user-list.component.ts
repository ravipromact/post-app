import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService,
    private router:Router,
    private appService:AppService,
    private route:ActivatedRoute) { }
  users!:any[];

  loggedInUser:any;


    promptUser(user:any){
      if(user.username === this.loggedInUser.user.username){
        if(window.confirm('You are logged in with this account, Are you sure ?')){
          this.deleteUser(user);
        }
      }else{
        if(window.confirm('Are you sure ?')){
          this.deleteUser(user);
        }
      }
    }

  // Method to delete user
  deleteUser(user:any){
    this.appService.enableLoader(true);
    this.userService.deleteUser(user.id).subscribe((user:any) => {
    
      if(user){
        this.users = this.users.filter((response:any) => {
          return response.id !== user.id
        });
        this.appService.enableLoader(false);
      }

      if(this.users.length === 0 ||(user.username === this.loggedInUser.user.username)){
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login'])
      }

    });
    
  }

  ngOnInit(): void {
    
    this.userService.getUsers().subscribe((users) => {
      if(users){
        this.users = users.sort((a:any, b:any) => a.id - b.id);
      }
    });

    this.userService.currentUser.subscribe((user:any)=>{
      this.loggedInUser = user;
    })
  }

}
