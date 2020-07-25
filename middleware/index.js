var Blog = require("../models/blog");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkBlogOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Blog.findById(req.params.id, function (err, foundBlog) {
            if (err) {
                res.redirect("/blogs");
            } else {
                // does user own the blog?
                if (foundBlog.user_id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("/blogs/"+req.params.id);
                }
            }
        });
    } else {
        res.redirect("/blogs");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("/blogs");
            } else {
                // does user own the comment?
                if (foundComment.user_id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("/blogs");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;