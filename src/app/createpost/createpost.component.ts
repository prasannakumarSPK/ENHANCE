import { Component, OnInit } from '@angular/core';
import {NgForm,FormGroup,Validators,FormControl} from '@angular/forms';
import {PostService} from '../posts.service';
import {ActivatedRoute,ParamMap} from '@angular/router';// very much useful while editing or creating post

import {PostModel} from '../post.model';
// import { mimeType } from "./mime-type.validator";// it is to add restrictions on input files (onlyimages/ pdf's)
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
 
	input_title = "";
	input_content = "";

  private mode = 'create';// mode is to swap b/w create and update
  private postId:string;

  post : PostModel;
  form:FormGroup;
  imagePreview:string;

  constructor(public PostService:PostService,public route:ActivatedRoute) { }

  ngOnInit() {

    /* here we are adding form controls using template/reactive driven approach*/
    this.form = new FormGroup({
      title:new FormControl(null,{validators:[Validators.required,Validators.minLength(3),]}),// null(no fields) indicates begining of form
      content : new FormControl(null,{validators:[Validators.required]}),
      image : new FormControl(null,{validators:[Validators.required]
})
    });

    // we code this routing for post id as we mentioned in Routes in app-routing.module

    /*Note:  importance  of edit is two way data binding i.e to display back data in to form */
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
        if(paramMap.has('postId')){//we get this from app-routing.module.ts
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          // this.post = this.PostService.getSinglePost(this.postId);
          this.PostService.getSinglePost(this.postId).subscribe(postData=>{
            this.post = {id:postData._id,title:postData.title,content:postData.content,imagePath:postData.imagePath};
            this.form.setValue({
              title:this.post.title,
              content:this.post.content ,
              image:this.post.imagePath
            });
          });
          // console.log("********"+this.post.title);
        }
  
        else{
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();// when another image is picked automatoiically updates

    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSavePost(){
    
  	if(this.form.invalid){
  		return;
    }
    if(this.mode === 'create'){
      console.log("enter here");
  	   this.PostService.addPost(this.form.value.title,this.form.value.content,this.form.value.image);
     }
    else{
       this.PostService.updatePost(this.postId,this.form.value.title,this.form.value.content,this.form.value.image);
     }
  	// this.form.resetForm();
    this.form.reset();

  }

  SearchMeaning(){
    const word = (this.form.value.title).toLowerCase();
    console.log(word);
    this.PostService.getMeaning(word);
  }

}
