import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/shared/app.service';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent implements OnInit {
  selectedFiles!: FileList;
  // progressInfos:any = [];
  // message = '';
  // fileInfos: Observable<any> | null = null;
  constructor(private userService:UserService,
    private fb:FormBuilder,
    private postService:PostService,
    private router:Router,
    private appService:AppService,) { }

  //Post form Group
  postForm:FormGroup = this.fb.group({
    description:'',
    user:'',
    media:''
  })

  //variable to store uploaded images id
  mediaImage:any[] = [];

  //Add post method
  addPost(){
    
    this.postService.addPost(this.postForm.value).subscribe((post) =>{
      if(post !== null){
        this.router.navigate(['/post']);
        this.appService.enableLoader(false);
      }
    });
  }


  //Select image files to upload
  selectFiles(e:any): void {
   // this.progressInfos = [];
    this.selectedFiles = e.target.files;
  }

  
  uploadFiles(): void {
    this.appService.enableLoader(true);
    //this.message = '';
    if(this.selectedFiles?.length > 0){
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }else{
      this.addPost();
    }
    
  }

  //File upload Method
  upload(idx:any, file:any): void {
   // this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.postService.upload(file).subscribe(
      (event:any) => {
       
        if (event.type === HttpEventType.UploadProgress) {
         // this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          event.body.forEach((value:any)=> {
            this.mediaImage.push(value.id)
          })
          this.postForm.patchValue({
            media:this.mediaImage
          })

          //Call method only when all images are uploaded
         if(this.selectedFiles.length === this.mediaImage.length){          
          this.addPost();
         }

         // this.fileInfos = this.postService.getFiles();
        }
      });
  }
  ngOnInit(): void {
   //this.fileInfos = this.postService.getFiles();   
    //Subscribe to user id
    this.userService.currentUser.subscribe((response:any) =>{
      if(Object.keys(response).length > 0){
        this.postForm.patchValue({
          user:response.user.id
        })
      }
    })
   
   

  }

}
