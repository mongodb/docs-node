import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

// Create a new instance of the MongoClient using the provided URI
const client = new MongoClient(uri);

// Define a function to interact with the MongoDB database
async function run() {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db("insertDB");
    const haiku = database.collection("haiku");
    
    // Create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    // Insert the defined document into the "haiku" collection
    const result = await haiku.insertOne(doc);

    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
     // Close the MongoDB client connection
    await client.close();
  }
}
// Call the "run" function and handle errors with console.dir
run().catch(console.dir);
