import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostslistComponent } from './postslist/postslist.component';
import { HttpClientModule } from '@angular/common/http';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                CreatepostComponent,
                PostslistComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                FormsModule,
                HttpClientModule
                // MatFormFieldModule
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map