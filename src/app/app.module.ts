import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { PostModule } from './post/post.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ToasterModule } from './toaster/toaster.module';

import { LoaderModule } from './loader/loader.module';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { LayoutComponent } from './layout/layout.component';
import { NouserLayoutComponent } from './layout/nouser-layout/nouser-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    UserComponent,
    HeaderComponent,
    AddUserComponent,
    EditUserComponent,
    UserListComponent,
    RegisterComponent,
    LoginComponent,
    PageNotfoundComponent,
    LayoutComponent,
    NouserLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToasterModule,
    LoaderModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
