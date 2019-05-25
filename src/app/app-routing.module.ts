import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostslistComponent } from './postslist/postslist.component';

const routes: Routes = [
{path:'',component:PostslistComponent},
{path:'create',component:CreatepostComponent},
{path:'edit/:postId',component:CreatepostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
