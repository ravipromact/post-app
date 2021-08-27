import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { NouserLayoutComponent } from './layout/nouser-layout/nouser-layout.component';
import { LoggedInGuard } from './logged-in.guard';
import { LoginComponent } from './login/login.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { RegisterComponent } from './register/register.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: NouserLayoutComponent,
    children: [
      {path:'login', component:LoginComponent,canActivate:[LoggedInGuard]},
      {path: 'register', component: RegisterComponent,canActivate:[LoggedInGuard] },
      {path:'', redirectTo:'login', pathMatch:'full'},
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'user',
        component:UserComponent,
        canActivate:[AuthGuard],
        children:[
          {path:'', component:UserListComponent},
          {path:'add', component:AddUserComponent},
          {path:'edit/:id', component:EditUserComponent}
        ]
      },
      {path:'post',canActivate:[AuthGuard], loadChildren: ()=> import('./post/post.module').then(m => m.PostModule)},
      {path:'', redirectTo:'user', pathMatch:'full'},
      
    ]
  },
  {path:'**',component:PageNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
