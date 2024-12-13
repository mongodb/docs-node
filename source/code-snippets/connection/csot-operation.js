import { MongoClient } from "mongodb";

// start-operation
const uri = "<connection string uri>";
const client = new MongoClient(uri, {
  timeoutMS: 1000
});

async function run() {
    try {
      await client.connect(); // Ensure you connect the client
      console.log("Connected to the database");
  
      const db = client.db('test-db');
      const coll = db.collection('test-collection');
  
      // Perform operations with the collection
      const result = await coll.insertOne({ name: "Yngwie" });
      console.log("Insert result:", result);
    } finally {
      await client.close();
    }
  }
  
  run().catch(console.dir);
  
// end-operation