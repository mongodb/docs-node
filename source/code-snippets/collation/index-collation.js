const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://sample-hostname:27017/?poolSize=20&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);
const dbName = "sample_mflix";;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db(dbName);
  
    createCollatedIndex(db, function() {
        client.close();
      });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

function createCollatedIndex(db, callback) {
  // Get the contacts collection
  const collection = db.collection('movies');
  // Create the index
  collection.createIndex(
    { 'directors' : 1 },
    { 'unique' : 1 },
    { 'collation' : { 'locale' : 'en_US' } }, function(err, result) {
      console.log(result);
      callback(result);
  });
};