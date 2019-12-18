// ignored first line
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://ccho:ccho1@cluster0-wwze1.mongodb.net/test?retryWrites=true&w=majority";
  //"mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // define a database and collection on which to run the method
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // specify the document field
    const field = "year";

    // specify an optional query document
    const query = { directors: "Barbra Streisand"};

    const distinctValues = await collection.distinct(field, { directors: "Barbra Streisand"});
    console.log(distinctValues);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
