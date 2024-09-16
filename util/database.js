const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://shokhtv7165:cn2uhE6fOOB0ShMt@cluster0.8b4qa.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  //  When the connection is successful, 
  // it returns a MongoClient instance, which is used to interact with the MongoDB server.
  // client is just a parameter name chosen to capture the MongoClient instance returned by the connect() method.
    .then((client) => {
 // db() is used on a MongoClient instance to interact with databases within a MongoDB server.
      _db = client.db();
      // console.log(client, "db successfully connected");
      // here this callback have app.listen(3000) inside and it will listens the server when
      // client.db() database connection is done. 
      callback();
    })
    .catch((err) => console.log(err));
};

// getDb function is designed to provide access to the _db
//   variable, which holds the connected database instance from MongoDB.

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect
exports.getDb = getDb