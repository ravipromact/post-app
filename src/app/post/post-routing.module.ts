import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MyPostComponent } from './my-post/my-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDetailResolver } from './post-detail/post-detail.resolver';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post.component';

const routes: Routes = [  
    
    {path:'',component:PostComponent,children:[
      {path:'add', component:AddPostComponent},
      {path:'edit/:id', component:EditPostComponent},
      {path:'my-posts', component:MyPostComponent},
      {
        path:'', component:PostListComponent,
        children:[
          {path:':id', component:PostDetailComponent,resolve:{resolvedPost:PostDetailResolver}}
        ]
      }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
