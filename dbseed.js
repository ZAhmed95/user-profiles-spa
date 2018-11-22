var mongodb = require("mongodb");

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user_pofiles_spa", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  var db = client.db();
  var avatars = new mongodb.GridFSBucket(db, {bucketName: 'avatars'});
  var users = db.collection('users');

  // drop all avatar images
  avatars.drop(function(){
    console.log("Deleted avatar images");
  });
  // delete all users
  users.deleteMany(function(){
    console.log("Deleted users");
  });

  // create index on users name attribute
  users.createIndex({n: 'text'}, {unique: true}, function(){
    console.log("Creating index on usernames");
  });

  // create seed users
  users.insertMany([
    {
      n: 'zia',
      a: 23
    },
    {
      n: 'test',
      a: 20
    }
  ], function(){
    console.log("Creating seed users");
  });

  client.close();
});
