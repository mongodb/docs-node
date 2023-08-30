/* Delete multiple documents */

// Import the MongoClient type from the mongodb package.
import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

// Create a new client and connect to MongoDB.
const client = new MongoClient(uri);

async function run() {
  try {
    // Access the movies collection from the sample_mflix database.
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a filter for movies with a title containing the string "Santa".
    const query = { title: { $regex: "Santa" } };

    // Delete all documents that match the preceding query filter.
    const result = await movies.deleteMany(query);

    // Print the number of deleted documents.
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    // Close the client after the operation completes.
    await client.close();
  }
}
// Run the program and handle any errors that occur during execution.
run().catch(console.dir);
