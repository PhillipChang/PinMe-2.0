require('dotenv').config();
var path = require("path");
var uuid = require("uuid/v4");
var AWS = require("aws-sdk");
var db = require("../models");

var s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

module.exports = function(app, Sequelize) {
    // const Op = Sequelize.Op;
    // Route to Landing Page
    app.get("/", function(req,res){
        res.sendFile(path.join(__dirname, "../public/html/index.html"));
    });

   
    // Route to Create a User Page
    app.get("/users/register", function(req,res) {
        res.sendFile(path.join(__dirname, "../public/html/signUp.html"));
    });

    
    // Route to Create a User Acc
    app.post("/api/users/register", function(req,res) {
        db.User.create({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            avatar: req.body.avatar,
            uuid: req.body.uuid,
            classes: req.body.classes
        }).then(function(data) {
            res.json(data)
        })
    });


    app.post("/api/image/create", function(req,res) {
        var imageName = req.body.name.toLowerCase();
        imageName = imageName.replace(/\s/g, '');
        imageName = imageName + uuid();

        var newUser = {
            name: req.body.name,
            image: imageName,
        }

        uploadImage(req, newUser.image, function(data){

            res.json(data) //Should have img url now

        });


        function uploadImage(req,image, cb) {
            //raw image data file
            var imageFile = req.files.file.data;
        
            s3.createBucket(function(){
                var params = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    ACL:'public-read', 
                    Key: `profile/${image}.jpg`,
                    Body: imageFile 
                }
                s3.upload(params,function(err, data) {
                    if(err) {
                        console.log("error with upload");
                        console.log(err);
                    }
                    console.log("Upload Success");
                    cb(data);
                })
            })
        }
    });
    


    app.get("/users/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/user.html"));
    });

    app.get("/api/key", function(req, res) {
      res.json(
        {
          apiKey: process.env.firebase_apiKey,
          authDomain: process.env.firebase_authDomain,
          databaseURL: process.env.firebase_databaseURL,
          projectId: process.env.firebase_projectId,
          storageBucket: process.env.firebase_storageBucket,
          messagingSenderId: process.env.firebase_messagingSenderId,
          appId: process.env.firebase_appId
        }
      )
    })

    // Display All Favorites
    app.get("/api/favorite", function(req,res) {
        db.Favorite.findAll({})
            .then(function(dbFavorite){
               
                console.log(dbFavorite);
                
                res.json(dbFavorite);
            });
    });
    
};