import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'; 
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostListComponent } from './post-list/post-list.component';

import { ToasterModule } from '../toaster/toaster.module';
import { LoaderModule } from '../loader/loader.module';
import { MyPostComponent } from './my-post/my-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    CommentsComponent, 
    AddPostComponent, 
    PostListComponent, 
    MyPostComponent, 
    EditPostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    LoaderModule
  ]
})
export class PostModule { }
