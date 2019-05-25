import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var PostService = /** @class */ (function () {
    // private posts : any = [];
    function PostService(http) {
        this.http = http;
        this.posts = [];
    }
    PostService.prototype.getPosts = function () {
        var _this = this;
        // return this.posts;
        this.http.get('http://localhost:3000/api/posts')
            .subscribe(function (postData) {
            _this.posts = postData.posts;
            console.log(_this.posts);
        });
        // return this.posts;
    };
    PostService.prototype.addPost = function (title, content) {
        var post = { TITLE: title, CONTENT: content };
        this.posts.push(post);
    };
    PostService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PostService);
    return PostService;
}());
export { PostService };
//# sourceMappingURL=posts.service.js.map