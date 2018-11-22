var mongodb = require("mongodb");

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user_pofiles_spa", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  var db = client.db();
  var avatars = new mongodb.GridFSBucket(db, {bucketName: 'avatars'});

  db.collection('users').find({}).toArray(function(err, docs){
    if (err){
      console.log(err);
      return;
    }
    else {
      for (doc of docs){
        console.log(doc);
      }
    }
  });

  avatars.find({}).toArray(function(err, docs){
    if (err){
      console.log(err);
      return;
    }
    else {
      for (doc of docs){
        console.log(doc);
      }
    }
  });

  client.close();
});
