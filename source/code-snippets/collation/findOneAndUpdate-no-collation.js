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
  
    findAndUpdate(db, function() {
      client.close();
    });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
function findAndUpdate(db, callback) {
  const collection = db.collection('names');
  collection.findOneAndUpdate({ first_name : { $lt: "Gunter" } }, { $set: { verified: true } }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}