import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss'],
})
export class MyPostComponent implements OnInit {

  constructor(private postService:PostService,
    private userService:UserService,
    private appService:AppService) { }
  myPost:any[] = [];
  currentUser:any;

  // Method to delete post
  delete(post:any){
    if(window.confirm('Are you sure ?')){
      this.appService.enableLoader(true);
      this.postService.deletePost(post.id).subscribe((value:any) => {
        if(value){
          this.myPost = this.myPost.filter((value) => value !== post)
          this.appService.enableLoader(false)
        }
        
      }); 
    }
  }
  ngOnInit(): void {
    
    //get all the Post
    this.postService.getPosts().subscribe((posts:any) => {
      this.myPost = posts;
    })

    //get Current logged in user
    this.userService.currentUser.subscribe((user:any) => this.currentUser = user)

  }

}
