/* Update a document */

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

    // Create a filter for movies with the title "Random Harvest".
    const filter = { title: "Random Harvest" };

    // Set the upsert option to insert a document if no documents match the filter.
    const options = { upsert: true };

    // Specify the update to set a value for the plot field.
    const updateDoc = {
      $set: {
        plot: `A harvest of random numbers, such as: ${Math.random()}`
      },
    };

    // Update the first document that matches the filter with the
    // specified update.
    const result = await movies.updateOne(filter, updateDoc, options);
    
    // Print the number of matching documents and the number of modified documents.
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } finally {
    // Close the client after the operation completes.
    await client.close();
  }
}
// Run the program and handle any errors that occur during execution.
run().catch(console.dir);
