// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Estimate the total number of documents in the collection
    // and print out the count.
    collection.estimatedDocumentCount({}, function(error, result) {
      if (error) {
        console.log("Error: " + error);
      } else {
        console.log(
          "Estimated number of documents in the movies collection: " + result,
        );
      }
    });

    // Query for movies from Canada.
    const query = { countries: "Canada" };

    // Find the number of documents that match the specified
    // query, (i.e. with "Canada" as a value in the "countries" field)
    // and print out the count.
    collection.countDocuments(query, {}, function(error, result) {
      if (error) {
        console.log("Error: " + error);
      } else {
        console.log("Number of movies from Canada: " + result);
      }
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
