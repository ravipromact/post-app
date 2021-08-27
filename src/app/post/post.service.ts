import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { AppService } from '../shared/app.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  // All api endpoints for posts,comments & files
  postsApi:string = `${environment.apiUrl}/posts`;
  uploadApi:string = `${environment.apiUrl}/upload`;
  commentsApi:string = `${environment.apiUrl}/comments`;

  private commentsCount = new BehaviorSubject([]);
  currentCommentCount = this.commentsCount.asObservable();

  constructor(private http:HttpClient,private appService:AppService) { }

    
  /* Method for Posts */

  //Get All posts
  getPosts():Observable<[]>{
    return this.http.get<[]>(this.postsApi).pipe(
      tap((posts:any)=>{
        const arr:any = []
        posts.map((x:any) =>{
        arr.push(x.comments.length)
      })
      this.getCommentCounts(arr);
      })
    );
  }

  //Add Post
  addPost(formData:any):Observable<any>{
    return this.http.post<any>(this.postsApi, formData, {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }).pipe(
    tap((post) => console.log(`added hero w/ id=${post}`)),
    catchError(this.appService.handleError('Failed to create Post'))
  );
  }

  //Get Post by Id
  getSinglePost(id:number):Observable<any>{
    return this.http.get<any>(`${this.postsApi}/${id}`).pipe(
      tap((post) => console.log(`fetched post by id: ${id}`)),
      catchError(this.appService.handleError(`No post found with id ${id}`))
    );
  }

  //Update Single Post
  updatePost(post:any):Observable<any>{
    return this.http.put<any>(`${this.postsApi}/${post.id}`,post).pipe(
      tap((post) => console.log(`Updated post by id: ${post.id}`)),
      catchError(this.appService.handleError('Failed Updating Post'))
    );
  }

  //Delete Single Post
  deletePost(id:number):Observable<any>{
    return this.http.delete<any>(`${this.postsApi}/${id}`).pipe(
      tap((post) => console.log(`deleted post by id: ${id}`))
    );
  }


  /* Method for Comments */

  // Add Comment
  addComments(value:any):Observable<any>{
    return this.http.post<any>(this.commentsApi,value).pipe(
      tap((comment) => console.log('comment added')),
      catchError(this.appService.handleError(`Comment not added`))
    );
  }

  //Get Comments
  getComments():Observable<any>{
    return this.http.get<any>(this.commentsApi).pipe(
      tap((comment) => console.log(`fetched All comments`)),
      catchError(this.appService.handleError(`Failed to get all comments`))
    );
  }

  //Updated Comment
  updateComment(comment:any):Observable<any>{
    return this.http.put<any>(`${this.commentsApi}/${comment.id}`, comment).pipe(
      tap((comment) => console.log('comment updated')),
      catchError(this.appService.handleError(`Failed to update comment`))
    );
  }

  //Delete Comment
  deleteComment(id:any):Observable<any>{
    return this.http.delete<any>(`${this.commentsApi}/${id}`).pipe(
      tap((comment) => console.log('comment deleted')),
      catchError(this.appService.handleError(`Failed to delete comment`))
    );
  }
  
  // Set Total count of Comments
  getCommentCounts(value:any){
    this.commentsCount.next(value);
  }


  /* Method for Uploading File */
  
  // Method for Image Upload
  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('files', file);

    const request = new HttpRequest('POST', `${this.uploadApi}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(request).pipe(
      catchError(this.appService.handleError('Error uploading image'))
    );
  }

  // Method to get all uploaded Images
  getFiles(): Observable<any> {
    return this.http.get(`${this.uploadApi}/files`);
  }

}
