import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostslistComponent } from './postslist/postslist.component';
import {PostService} from './posts.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component'


@NgModule({
  declarations: [
    AppComponent,
    CreatepostComponent,
    PostslistComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
