import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  @Output() sidebarOff = new EventEmitter<boolean>();
  sidebarMenu = [
    {name:'User',icon:'user',path:'/user'},
    {name:'Posts',icon:'post',path:'/post'}
  ]
  constructor() { 
   
  }
// Method to Toggle sidebar
toggleSidebar(value:boolean){
  this.sidebarOff.emit(value);
}
  ngOnInit(): void {
  }

}
