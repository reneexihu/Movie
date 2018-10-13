var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Frozen", 
        image: "http://www.gstatic.com/tv/thumb/v22vodart/9991822/p9991822_v_v8_aa.jpg",
        description: "Frozen is a 2013 American 3D computer-animated musical fantasy film produced by Walt Disney Animation Studios and released by Walt Disney Pictures."
    },
    {
        name: "Mulan", 
        image: "http://www.visitnarrabri.com.au/wp-content/uploads/2018/04/mulan-18.jpg",
        description: "Mulan is a 1998 American animated musical action adventure film produced by Walt Disney Feature Animation for Walt Disney Pictures. It is based on the Chinese legend of Hua Mulan."
    },
    {
        name: "Harry Potter and the Philosopher's Stone", 
        image: "https://mvpo.us/img/P5159.jpg",
        description: "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to the Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort."
    }
]

function seedDB(){
   //Remove all movies
   Movie.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed movies!");
         //add a few movies
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a movie");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                movie.comments.push(comment);
                                movie.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
