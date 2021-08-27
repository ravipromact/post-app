import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/shared/app.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private postService:PostService,
    private appService:AppService,
    private router:Router) { }

    // Edit form Model
    model:any ={
      id:'',
      description:''
    }

  //Method to update Post
  updatePost(){
    this.appService.enableLoader(true);
    this.postService.updatePost(this.model).subscribe((response:any) =>{
      if(response){
        this.router.navigate(['/post/my-posts']);
      }
    });
    
  }
  ngOnInit(): void {
    //TO fetch details of the post by id
    this.route.paramMap.subscribe((params) =>{
      const id = +params.get('id')!;
      this.postService.getSinglePost(id).subscribe((post:any) => {
        this.model.id = id;
        this.model.description = post.description;
      })
    })
  }

}
