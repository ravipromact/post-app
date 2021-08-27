import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Injectable({
  providedIn: 'root'
})
export class PostDetailResolver implements Resolve<boolean> {
  constructor(private postService:PostService,private appService:AppService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = +route.paramMap.get('id')!;
    return this.postService.getSinglePost(id).pipe(
      take(1),
      catchError(this.appService.handleError(`Failed to get Post with id ${id}`))
    )
  }
}
