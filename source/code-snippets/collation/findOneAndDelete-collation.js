// ignored first line
const { MongoClient } = require("mongodb");
const assert = require('assert');

// Connection URI
const uri =
  "mongodb+srv://sample-hostname:27017/?poolSize=20&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);
const dbName = "sample_mflix";

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db(dbName);
  
    findAndDelete(db, function() {
      client.close();
    });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

function findAndDelete(db, callback) {
  const collection = db.collection('numbers');
  collection.findOneAndDelete({ a : { $gt: "100" } }, {collation : { locale : 'en', numericOrdering: true } }, function(err, result) {
    assert.equal(err, null);
    console.log(result);
    callback(result);
  });
}