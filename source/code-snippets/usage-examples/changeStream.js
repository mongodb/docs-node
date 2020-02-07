// ignored first line
cconst { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority&useUnifiedTopology=true";

const client = new MongoClient(uri);

let changeStream;
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // open a Change Stream on the "movies" collection
    changeStream = collection.watch();

    // set up a listener when change events are emitted
    const changeListener = changeStream.on("change", next => {
      // process any change event
      console.log("a change to the collection happened: \t", next);
    });

    /*

     wrap the setTimeout methods in a new Promise otherwise the try
     block will finish executing and the finally block will be run
     before the setTimeout methods have time to run

    */

    await new Promise(resolve => {
      // wait 1s for the event listener to register before emitting a change event
      const outerTimer = setTimeout(async () => {
        // insert a document into the collection to emit an event
        await collection.insertOne({
          test: "sample movie document insertion 1"
        });
        // wait 1s to close `changeStream` after the event listener's execution
        const innerTimer = setTimeout(async () => {
          resolve(await changeStream.close());
        }, 1000);
      }, 1000);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);