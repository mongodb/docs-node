// ignored first line
const { MongoClient } = require("mongodb");
const assert = require('assert');

// Replace the following with your MongoDB deployment's connection
// string
const uri =
  "mongodb+srv://sample-hostname:27017/?poolSize=20&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("sample_mflix");

    // Create the collection with a collation
    await db.createCollection("souvenirs",
    {
      "collation" :
        { "locale": "fr_CA" }
    } 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);