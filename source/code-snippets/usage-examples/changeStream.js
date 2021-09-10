import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;
async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // open a Change Stream on the "movies" collection
    changeStream = movies.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", next => {
      // process any change event
      console.log("received a change to the collection: \t", next);
    });

    await simulateAsyncPause();

    await movies.insertOne({
      test: "sample movie document"
    });

    await simulateAsyncPause();

    await changeStream.close(() => console.log("closed the change stream"));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
