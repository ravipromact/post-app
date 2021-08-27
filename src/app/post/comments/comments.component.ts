import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

import { UserService } from 'src/app/user/user.service';
import { AppService } from 'src/app/shared/app.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  constructor(private userService:UserService,
    private postService:PostService,
    private appService:AppService,
    private route:ActivatedRoute,
    private router: Router) { 
      this.router.events.subscribe((event) =>{
        if (event instanceof NavigationStart) {
          this.model.commentText = '';
        }
      })
    }
  @Input() post:any;
  commentsList:any = [];
  user:string | undefined;

  // Comments form model
  model:any ={
    commentText:'',
    post:{
      id:''
    },
    user:{
      id:''
    }
  };
  commentsCount:any;
  editable:boolean = false;
  commentId:any;

  
  //To fetch all comments
  getComments(){
    this.route.paramMap.subscribe((params:any) => {
      const id = +params.get('id');
      this.postService.getComments().subscribe(comments => {        
        this.commentsList = comments.filter((comment:any) => comment.post?.id === id);
      })
    })

    //To get comments count for each single post
    this.postService.getPosts().subscribe((value)=>{
      this.commentsCount = value;
    });
  }
  
  //Add comment
  addComment(){
    this.appService.enableLoader(true);
    this.userService.currentUser.subscribe((user:any)=>{
      if(Object.keys(user).length > 0){
        this.model.post.id = this.post.id;
        this.postService.addComments(this.model).subscribe(() => {
          this.getComments();
          this.appService.enableLoader(false);
        });
        this.model.commentText = '';
      }else{        
        this.appService.enableToaster('info','Please login first')
      }
      
    })
    
  }
  
  //Delete Comment
  delete(comment:any){
    this.appService.enableLoader(true);
    this.postService.deleteComment(comment.id).subscribe(()=>{
      this.getComments();
      this.commentsList = this.commentsList.filter((h:any) => h !== comment);
      this.appService.enableLoader(false);
    });
  }

  //Set textbox value with selected comment value
  edit(comment:any){
    this.model.commentText = comment.commentText;
    this.editable = true;
    this.commentId = comment.id;
  }

  //Cancel edit comment
  cancel(){
    this.model.commentText = '';
    this.editable = false;
  }
  
  //Update Comment method
  updateComment(value:any){
    this.appService.enableLoader(true);
    const commentData = {
      id:this.commentId,
      commentText:value
    }
    console.log(commentData)
    this.postService.updateComment(commentData).subscribe((value)=>{
      
      if(value){
        this.getComments();
        this.cancel();
        this.appService.enableLoader(false);
      }
     
    })
    
  }
  ngOnInit(): void {
   
    this.getComments();
    
    //Subscribe to user id
    this.userService.currentUser.subscribe(value => {
     if(Object.keys(value).length > 0){
      this.model.user.id = value.user.id;
     }
  
    })
  }
  
  

}
