const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    // define a database and collection on which to run the method
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // specify the document field
    const fieldName = "year";

    // specify an optional query document
    const query = { directors: "Barbra Streisand" };

    const distinctValues = await movies.distinct(fieldName, query);

    console.log(distinctValues);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
