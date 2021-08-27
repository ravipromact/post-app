import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // Users api endpoints
  loginApi:string = `${environment.apiUrl}/auth/local`;
  registerApi:string = `${environment.apiUrl}/auth/local/register`;
  usersApi:string = `${environment.apiUrl}/users`;
  usersLoggednInApi:string = `${environment.apiUrl}/users/me`;




  //Observable to set user token to local storage
  private currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http:HttpClient,
    private appService:AppService,
    private router:Router,private postService:PostService) { }
  

  //Login Method
  loginUser(email:string,password?:string):Observable<any>{
    
    return this.http.post<any>(this.loginApi, {
      identifier: email,
      password: password,
    }).pipe(
    tap((user) => {
      console.log(user);
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }),
    catchError(this.appService.handleError('Email or Password invalid'))
  );
  }

  //Register user method
  registerUser(formData:any):Observable<any>{
    return this.http.post<any>(this.registerApi, formData, {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }).pipe(
    tap((response) => {
      const user = response.user;
      this.loginUser(formData.email,formData.password).subscribe((user)=>{
        if(user){
          this.router.navigate(['user']);
        }
      })
      
    }),
    catchError(this.appService.handleError('Username or Email already taken'))
  );
  }

  // Logout method to clear user token
  logOut(){
    this.currentUserSubject.next('');
    localStorage.removeItem('currentUser')
  }

  //Method to Add User
  addUser(formData:any):Observable<any>{
    return this.http.post<any>(this.registerApi, formData, {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }).pipe(
    tap((newHero) => console.log(`added user w/ id=${newHero}`)),
    catchError(this.appService.handleError('Username or Email already exist'))
  );
  }
  
  //Method to Return All users
  getUsers():Observable<any>{
    return this.http.get<any>(this.usersApi);
  }

  //Method to getuser by Id
  getUser(id:number):Observable<any>{
    return this.http.get<any>(`${this.usersApi}/${id}`).pipe(
      tap((user:any)=> {
        if(user == null){
          console.log(`get user w/ id=${user}`)
         

          // this.appService.responseMessage('failed')
          // this.appService.changeToaster(true);
          //this.appService.toasterMessage(`User not exist`);
          this.appService.enableToaster('failed','User not exist')
          
        }
      }),
      catchError(this.appService.handleError('User not exist'))
    );
  }

  //Update Single user data
  updateUser(userData:any):Observable<any>{
    return this.http.put<any>(`${this.usersApi}/${userData.id}`,userData).pipe(
      tap(()=> {
        // this.appService.responseMessage('success')
        // this.appService.changeToaster(true);
        // this.appService.toasterMessage(`User updated Successfully`);
        this.appService.enableToaster('success','User updated Successfully')
      }),
      catchError(this.appService.handleError('Username or Email already exist'))
    );
  }

  //Delete user by Id
  deleteUser(id:number):Observable<any>{
    return this.http.delete<any>(`${this.usersApi}/${id}`).pipe(
      tap((user:any)=> {
        console.log(`deleted user w/ id=${this.usersApi}/${id}`)
        //Delete user posts
        for(let i = 0; i< user.posts.length;i++){          
          this.postService.deletePost(user.posts[i].id).subscribe();
        }
        //Delete user comments
        for(let i = 0; i< user.comments.length;i++){          
          this.postService.deleteComment(user.comments[i].id).subscribe();
        }

      }
      )
    );
  }

}
