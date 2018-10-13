var Movie = require("../models/movie");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkMovieOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Movie.findById(req.params.id, function(err, foundMovie){
           if(err){
               req.flash("error", "Movie not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundMovie.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission.");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged");
    res.redirect("/login");
}

module.exports = middlewareObj;