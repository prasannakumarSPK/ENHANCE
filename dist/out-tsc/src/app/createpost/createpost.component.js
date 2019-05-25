import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostService } from '../posts.service';
var CreatepostComponent = /** @class */ (function () {
    function CreatepostComponent(PostService) {
        this.PostService = PostService;
        this.input_title = "";
        this.input_content = "";
    }
    CreatepostComponent.prototype.ngOnInit = function () {
    };
    CreatepostComponent.prototype.onAddPost = function (form) {
        if (form.invalid)
            return;
        this.PostService.addPost(form.value.input_title, form.value.input_content);
        form.resetForm();
    };
    CreatepostComponent = tslib_1.__decorate([
        Component({
            selector: 'app-createpost',
            templateUrl: './createpost.component.html',
            styleUrls: ['./createpost.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [PostService])
    ], CreatepostComponent);
    return CreatepostComponent;
}());
export { CreatepostComponent };
//# sourceMappingURL=createpost.component.js.map