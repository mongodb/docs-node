import { MongoClient } from "mongodb";

const { MongoClient } = require('mongodb');

//start-csot
async function run() {
  // Creates a new MongoClient with a client-level timeoutMS configuration
  const uri = "<connection string uri>";
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000 // Client-level timeout: 5 seconds
  });

  try {
    await client.connect();

    const db = client.db('test-db');
    const coll = database.collection('test-collection');

    // Performs a query operation with an operation-level timeoutMS configuration
    const docs = await coll.find({}, { timeoutMS: 1000 }).toArray(); // Operation-level timeout: 1 second

    console.log(docs);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
//end-csot