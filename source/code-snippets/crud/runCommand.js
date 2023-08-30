import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = "<connection string uri>";

// Create a new instance of the MongoClient using the provided URI
const client = new MongoClient(uri);

// Define a function to interact with the MongoDB database
async function run() {
  try {
    // start-runcommand
    // Connect to the "testDB" database
    const db = client.db("testDB");

    // Run a cursor command to check metadata consistency within the database
    const cursor = await db.runCursorCommand({
        checkMetadataConsistency: 1,
    });
    // Iterate through the cursor's results and log each document
    for await (const doc of cursor) {
      console.log(doc);
    }
    // end-runcommand
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
}
// Call the "run" function and handle any errors using console.dir
run().catch(console.dir);

