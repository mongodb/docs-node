const uri = "mongodb://localhost:27017/test?maxPoolSize=5000";
// create a new MongoClient
const client = new MongoClient(uri);

client.connect(err => {
  // connection
});
