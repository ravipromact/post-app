import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  constructor() { }
  sidebarClosed:boolean = true;
  toggleSidebar(){
    this.sidebarClosed = !this.sidebarClosed;
  }
  ngOnInit(): void {
  }

}
