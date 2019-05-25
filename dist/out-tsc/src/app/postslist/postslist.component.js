import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostService } from '../posts.service';
var PostslistComponent = /** @class */ (function () {
    function PostslistComponent(PostService) {
        this.PostService = PostService;
        this.posts = [];
    }
    PostslistComponent.prototype.ngOnInit = function () {
        this.posts = this.PostService.getPosts();
    };
    PostslistComponent = tslib_1.__decorate([
        Component({
            selector: 'app-postslist',
            templateUrl: './postslist.component.html',
            styleUrls: ['./postslist.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [PostService])
    ], PostslistComponent);
    return PostslistComponent;
}());
export { PostslistComponent };
//# sourceMappingURL=postslist.component.js.map