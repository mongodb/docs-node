// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useUnifiedTopology: true });
let changeStream;
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");
    // create a change stream on the movies collection
    changeStream = collection.watch();
    // set up an action on each change event
    changeStream.on("change", next => {
      // process a change event
      console.log("a change to the collection happened: \t", next);
    });
    setTimeout(async () => {
      console.log("inserting");
      await collection.insertOne({ test: "change stream" });
      setTimeout(async () => {
        console.log("deleting");
        await collection.deleteOne({ test: "change stream" });
      });
    }, 1000);
  } finally {
    setTimeout(async () => {
      await changeStream.close();
      await client.close();
    }, 2500);
  }
}
run().catch(console.dir);
