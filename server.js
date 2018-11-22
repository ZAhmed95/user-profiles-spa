const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const multer = require("multer");
const upload = multer();
const ObjectID = mongodb.ObjectID;

var db;
var avatars; // GridFS bucket
var users; // users collection

var app = express();
app.use(bodyParser.json());

// create path to Angular root directory
var distDir = __dirname + "/app/";
app.use(express.static(distDir));

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user_pofiles_spa", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  avatars = new mongodb.GridFSBucket(db, {bucketName: 'avatars'});
  users = db.collection('users');

  app.listen(process.env.PORT || 8080);
});

app.post('/signup', upload.single('avatar'), function(req, res){
  let newUser = req.body;
  let file = req.file;

  // check if this username is available
  users.findOne({n: newUser.username}, {}, function(err, doc){
    if (doc){
      // if a user was found with this username, return error
      res.json({type: "error", scope: "username", message: "That username is taken"});
      return;
    }

    // upload user avatar, if one was chosen
    if (file){
      let ups = avatars.openUploadStream(file.originalname);
      ups.
      on('error', function(error){
        console.log(error);
      }).
      on('finish', function(){
        newUser.avatarID = ups.id;
        createNewUser(newUser, res);
      }).
      end(file.buffer);
    }
    else {
      createNewUser(newUser, res);
    }
  });
});

app.post('/login', function(req, res){
  let username = req.body.username;
  users.findOne({n: username}, function(err, doc){
    if (doc){
      res.json({type: "success", user: doc});
    }
    else {
      res.json({type: "error", scope: "username", message: "There is no user with that username"})
    }
  });
});

app.get('/avatars/:id', function(req, res){
  let dls = avatars.openDownloadStream(new ObjectID(req.params.id));
  dls.on('error', function(){
    res.status(404).json({type: "error", scope: "avatar", message: "Image not found"});
  });
  dls.pipe(res);
})

// Helper functions
function createNewUser(newUser, res){
  let userParams = {
    n: newUser.username,
    a: newUser.age,
    i: newUser.avatarID
  };

  users.insertOne(userParams, function(err, result){
    if (err){
      res.status(500).json(err);
    }
    else {
      res.json({type: "success", message: "Successfully created new user", user: result.ops[0]});
    }
  });
}