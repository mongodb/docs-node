/* List indexes */

// Import the MongoClient type from the mongodb package.
const { MongoClient } = require("mongodb");

// Replace the placeholders with your credentials.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

// Create a new client and connect to MongoDB.
const client = new MongoClient(uri);

// Access a collection from a database.
const database = client.db("<databaseName>");
const collection = database.collection("<collectionName>");

async function run() {
  try {
    // start listIndexes example
    // List the indexes on the collection and output them as an array.
    const result = await collection.listIndexes().toArray();
    
    // Print the list of indexes.
    console.log("Existing indexes:\n");
    for(const doc in result){
        console.log(doc);
    }
    // end listIndexes example
  } finally {
    // Close the client after the operation completes.
    await client.close();
  }
}
// Run the program and handle any errors that occur during execution.
run().catch(console.dir);