const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;
async function run() {
  try {
    await client.connect();
    const database = client.db("insertDB");
    const collection = database.collection("haikus");

    // open a Change Stream on the "haikus" collection
    changeStream = collection.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", next => {
      // process any change event
      console.log("received a change to the collection: \t", next);
    });

    await simulateAsyncPause();

    await collection.insertOne({
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    });

    await simulateAsyncPause();

    await changeStream.close();
    
    console.log("closed the change stream");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);