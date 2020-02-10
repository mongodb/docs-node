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

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    collection.find({ 'city' : 'New York' }, { '_id' : 0 }, { 'collation' : {'locale' : 'de' } }).sort({ 'name': 1 }).toArray(function(err, docs) {
  
    findDocuments(db, function() {
      client.close();
    });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);