import {PostModel} from './post.model';
import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable({providedIn:'root'}) 
export class PostService{
		private posts : PostModel[] = [];
		private postsUpdated = new Subject<PostModel[]>();

		// private posts : any = [];
	constructor(private http:HttpClient,private router: Router){}
	/*NOTE : These GET and POST requests are handled in app.js app.get , app.post*/

	// getPosts(){
	// 	// return this.posts;
	// 	this.http.get<{ message: string; posts: PostModel[]}>('http://localhost:3000/api/posts')
	// 	.subscribe(getData=>{
	// 		this.posts = getData.posts;
	// 		this.postsUpdated.next([...this.posts]);	
	// 	});
	// 	// return this.posts;
	// } 

	// getSinglePost(id:string){
	// 	// here we return the only post out of all posts where post id's matches
	// 	return {...this.posts.find(p=>p.id === id)};
	// }

	getSinglePost(id:string){/*the above mentioned method is not correct way of retrieving..bcoz we loose if page is refreshed
	    the gud practice is retrieve data from the server*/
		// here we return the only post out of all posts where post id's matches
		return this.http.get<{_id:string,title:string,content:string,imagePath: string}>("http://localhost:3000/api/posts/"+id);
	}

	getMeaning(word:string){
		return this.http.get<{message:string,searchresult:string}>("http://localhost:3000/api/posts/meaning/"+word);
	}

	// updatePost(id:string,title:string,content:string){
	// 	const post:PostModel= {id:id,title:title,content:content};
	// 	this.http.put("http://localhost:3000/api/posts/"+id,post)
	// 	.subscribe(response=>{
	// 		/* we are adding this below code so that while editing if we refresh the form before editing our page doesn't show blank page*/
	// 		const updatedPosts = [...this.posts];// copying our posts
	// 		const oldPostIndex = updatedPosts.findIndex(p=>p.id === post.id);// we check every post id is matching or not
	// 		updatedPosts[oldPostIndex] = post;
	// 		this.posts = updatedPosts;
	// 		this.postsUpdated.next([...this.posts]);
	// 		// console.log(response)
	// 	});// response is msg (message:"update successful")obtained from server
	// }


	updatePost(id:string,title:string,content:string,image: File | string){
		 let postData: PostModel | FormData;
	    if (typeof image === "object") {
	      postData = new FormData();
	      postData.append("id", id);
	      postData.append("title", title);
	      postData.append("content", content);
	      postData.append("image", image, title);
	    } else {
	      postData = {
	        id: id,
	        title: title,
	        content: content,
	        imagePath: image
	      };
	    }

		this.http.put("http://localhost:3000/api/posts/"+id,postData)
		.subscribe(response=>{
			/* we are adding this below code so that while editing if we refresh the form before editing our page doesn't show blank page*/
			const updatedPosts = [...this.posts];// copying our posts
			const oldPostIndex = updatedPosts.findIndex(p=>p.id === id);// we check every post id is matching or not
			 const post: PostModel = {
          		id: id,
          		title: title,
          		content: content,
         		imagePath: ""
       			};
			updatedPosts[oldPostIndex] = post;
			this.posts = updatedPosts;
			this.postsUpdated.next([...this.posts]);
			this.router.navigate(["/"]);// it means it navigates to page containing '/'

			// console.log(response)
		});// response is msg (message:"update successful")obtained from server
	}




	getPosts(){
		// Modifying the posts we obtain from server to our convinience using pipe() method ..Since _id is received,We convert to id

		this.http.get<{ message: string; posts: any}>('http://localhost:3000/api/posts')// we put posts of type any bcoz we don't receive data as PostModel (since _id is received)
		.pipe(map((getData)=>{
			return getData.posts.map(post=>{
				return{
					title:post.title,
					content:post.content,
					id:post._id,
					imagePath: post.imagePath
				};
				
			});
		}))
		.subscribe(transformedPosts=>{
			this.posts = transformedPosts;
			this.postsUpdated.next([...this.posts]);	
		});
		// return this.posts;
	}

	getPostUpdateListener(){
		return this.postsUpdated.asObservable();
	}

	// addPost(title:string,content:string){
	// 	const post : PostModel = {TITLE:title,CONTENT:content};
	// 	this.posts.push(post);
	// }

	// addPost(title:string,content:string){
	// 	const post : PostModel = {id:null,title:title,content:content};
	// 	this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post)
	// 	.subscribe(postData=>{
	// 		console.log(postData.message);
	// 		const recvd_Id = postData.postId;
	// 		post.id = recvd_Id;// this helps to add id for post instead of inserting null value(in FRONT END)
	// 		this.posts.push(post);
	// 		// this.posts.push({ID:null,TITLE:'prasanna',CONTENT:'coolman'});
	// 		this.postsUpdated.next([...this.posts]);
	// 	});
		
	// }

	addPost(title:string,content:string,image: File){
		//const post : PostModel = {id:null,title:title,content:content};
		const postData = new FormData();
		postData.append("title",title);
		postData.append("content",content);
		postData.append("image",image,title);

		this.http.post<{message:string,post:PostModel}>('http://localhost:3000/api/posts',postData)
		.subscribe(responseData=>{
			const post:PostModel={
				id:responseData.post.id,
				title:title,
				content:content,
				imagePath: responseData.post.imagePath
			};

			// console.log(responseData.message);
			// const recvd_Id = responseData.postId;
			// post.id = recvd_Id;// this helps to add id for post instead of inserting null value(in FRONT END)
			this.posts.push(post);
			// this.posts.push({ID:null,TITLE:'prasanna',CONTENT:'coolman'});
			this.postsUpdated.next([...this.posts]);
			this.router.navigate(["/"]);
		});
		
	}

	deletePost(postId:string){
		this.http.delete('http://localhost:3000/api/posts/'+postId)
		.subscribe(()=>{
			console.log('Deleted');
			const updatedPosts = this.posts.filter(post=>post.id != postId);// filter is executed for every item in array
			this.posts = updatedPosts;
			this.postsUpdated.next([...this.posts]);
		});
	}
}