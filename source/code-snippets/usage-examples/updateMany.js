const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // create a filter to update all movies with a 'G' rating
    const filter = { rated: "G" };

    // increment every document matching the filter with 2 more comments
    const updateDoc = {
      $inc: {
        num_mflix_comments: 2,
      },
    };
    const result = await movies.updateMany(filter, updateDoc);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
