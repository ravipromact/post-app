import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  constructor(private appService: AppService,
    private postService: PostService,
    private route:ActivatedRoute,
    private userService:UserService) { }
  postDetails:any;
  commenCount:any;
  post:boolean = false;
  editable:boolean = false;
  
  //Post detail form model
  model:any = {
    id:'',
    description:''
  }

  
  //Method to get post by id
  getPost(){
    // this.route.paramMap.subscribe(param =>{
    //   const id = +param.get('id')!;
    //   this.postService.getSinglePost(id).subscribe((post) => {
    //     if(post){
    //       this.postDetails = post;
    //       this.model.id = this.postDetails.id;
    //       this.model.description = this.postDetails.description;
    //       this.commenCount = this.postDetails.comments.length;
    //       this.post = true;
    //       this.appService.clearToaster();
    //     }
    //   });
    // })
    this.route.data.subscribe(data=>{
      this.postDetails = data.resolvedPost;
      this.model.id = this.postDetails.id;
      this.model.description = this.postDetails.description;
      this.commenCount = this.postDetails.comments.length;
      this.post = true;
      this.appService.clearToaster();
    })
    // this.postDetails = this.route.snapshot.data['resolvedPost'];
    // this.model.id = this.postDetails.id;
    // this.model.description = this.postDetails.description;
    // this.commenCount = this.postDetails.comments.length;
    // this.post = true;
    // this.appService.clearToaster();


  }
  
  
  delete(post:any){
    this.appService.enableLoader(true);
   const comments = post.comments;
   comments.forEach((comment:any) => {
    this.postService.deleteComment(comment.id).subscribe();
   })
   this.postService.deletePost(post.id).subscribe();
  }
  
  ngOnInit(): void {
    this.getPost();
 
  }
 
  
}
