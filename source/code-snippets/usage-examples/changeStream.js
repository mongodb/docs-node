// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // create a change stream on the movies collection
    const changeStream = await collection.watch();
    // use the next() function on the changeStream iterator to access the next event
    const next = await changeStream.next();
    console.log("a change to the collection happened: \t", next);
    // Add your logic to process the document here

    // close the changeStream
    changeStream.close();
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
