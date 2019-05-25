import { Component, OnInit,OnDestroy } from '@angular/core';

import {PostModel} from '../post.model';
import  {PostService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit ,OnDestroy{

	posts:PostModel[]=[];
	private postsSub : Subscription;
  constructor(public PostService:PostService) { }

  // ngOnInit(){}

  ngOnInit() {
  	this.PostService.getPosts(); 
  	this.postsSub = this.PostService.getPostUpdateListener()
  	.subscribe((posts:PostModel[])=>{
      console.log(posts);
  		this.posts = posts;
  	});
  	// console.log(this.posts)
  }

  OnDelete(postId:string){
    this.PostService.deletePost(postId);
  }

   ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
