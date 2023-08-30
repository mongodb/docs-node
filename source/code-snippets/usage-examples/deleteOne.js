/* Delete a document */

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

    // Create a filter for movies with a title that is "Annie Hall".
    const query = { title: "Annie Hall" };

    // Delete the first document that matches the preceding query filter.
    const result = await movies.deleteOne(query);

    // Print the result of the operation, depending on if a document was
    // deleted or not.
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // Close the client after the operation completes.
    await client.close();
  }
}
// Run the program and handle any errors that occur during execution.
run().catch(console.dir);
