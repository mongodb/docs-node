const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    // begin-idx
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // Create a text index on the "fullplot" field in the
    // "movies" collection.
    const result = await movies.createIndex({ fullplot: "text" }, { default_language: "english" });
    console.log(`Index created: ${result}`);
    // end-idx

    // begin-query
    const query = { $text: { $search: "java coffee shop" } };
    const projection = { fullplot: 1 };
    const cursor = movies
      .find(query)
      .project(projection);
    // end-query

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
