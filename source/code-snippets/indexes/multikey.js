/* Create a multikey index */

// Import the MongoClient type from the mongodb package.
const { MongoClient } = require("mongodb");

// Replace the placeholders with your credentials.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

// Create a new client and connect to MongoDB.
const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    // Access the movies collection from the sample_mflix database.
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a multikey index on the "cast" field.
    const result = await movies.createIndex({ cast: 1 });
    // end-idx

    // Print the result of creating the index.
    console.log(`Index created: ${result}`);

    // begin-query
    // Create a filter to find documents where the cast field contains
    // "Viola Davis".
    const query = { cast: "Viola Davis" };

    // Create a projection to show only the cast and title fields.
    const projection = { _id: 0, cast: 1 , title: 1 };

    // Perform a find operation with the preceding filter and projection.
    const cursor = movies
      .find(query)
      .project(projection);
    // end-query

  } finally {
    // Close the client after the operation completes.
    await client.close();
  }
}
// Run the program and handle any errors that occur during execution.
run().catch(console.dir);
