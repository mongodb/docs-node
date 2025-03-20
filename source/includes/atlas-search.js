const { MongoClient } = require("mongodb");

// Replace the placeholder with your connection string.
const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Queries for documents that have a "title" value containing the word "Alabama"
    // begin-atlas-search
    const pipeline = [
        {
          $search: {
            index: "default",
            text: {
              query: "Alabama",
              path: "title"
            }
          }
        },
        {
          $project: {
            title: 1
          }
        }
    ];

    // start-run-agg
    const aggregationResult = await collection.aggregate(pipeline);
    // end-run-agg

    for await (const document of aggregationResult) {
      console.log(document);
    }
    // end-atlas-search
  } finally {
    await client.close();
  }
}

run().catch(console.dir);