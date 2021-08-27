import { Component, OnInit, Output,EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Output() sidebarOff = new EventEmitter<boolean>();
  @ViewChild('stickyMenu') menuElement!: ElementRef;

  showProfile:boolean = false;
  currentUser:any | undefined;
  sticky: boolean = false;

  constructor(private router:Router,private userService:UserService) { }

  // Method to Toggle sidebar
  toggleSidebar(value:boolean){
    this.sidebarOff.emit(value);
  }
  
  //Logout method
  logout(){   
    this.router.navigate(['login']);
    this.showProfile = false;
    this.userService.logOut();
  }
  ngOnInit(): void {
    //Method to subscribe user token
    this.userService.currentUser.subscribe((user:any) =>{
      if(Object.keys(user).length > 0){
        this.showProfile = true;
        this.currentUser = user;
      }
    })
    
  }

  //Listener for sticky nav
  @HostListener('window:scroll', ['$event'])
    handlefgScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll > 0){
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }

}
