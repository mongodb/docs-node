/* Count documents in a collection*/

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

    // Estimate the total number of documents in the collection
    // and print out the count.
    const estimate = await movies.estimatedDocumentCount();
    console.log(`Estimated number of documents in the movies collection: ${estimate}`);

    // Query for movies where the countries field includes "Canada".
    const query = { countries: "Canada" };

    // Find the number of documents that match the specified
    // query and print out the count.
    const countCanada = await movies.countDocuments(query);
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    // Close the client after the operations complete.
    await client.close();
  }
}
// Run the program and handle any errors that occur during execution.
run().catch(console.dir);
