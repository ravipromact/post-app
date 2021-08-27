import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  constructor(private postService:PostService,
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute,
    private appService:AppService) { 


    }
  posts:any = [];
  commentCount:any;

  //Method to navigate to Add post page
  addPost(){
    this.userService.currentUser.subscribe((user:any) =>{
      if(Object.keys(user).length > 0){
        this.router.navigate(['/post/add'])
      }else{
        this.appService.enableToaster('info','Please login first');
      }
    })
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts:any) => {
      this.posts = posts.sort((a:any, b:any) => b.id - a.id);
      if(this.posts.length !== 0){
        this.router.navigate([`${this.posts[0].id}`],{relativeTo:this.route})
      }
     
    })

   

    //Subscribe to counts comments
    this.postService.currentCommentCount.subscribe((message:any) => {
      this.commentCount = message;
    })


  }

}
