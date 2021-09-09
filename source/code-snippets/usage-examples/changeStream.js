import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 20000);
  });

let changeStream;
async function run() {
  try {
    await client.connect();
    const database = client.db('insert_db');
    const movies = database.collection('haiku');

    // open a Change Stream on the "haiku" collection
    changeStream = movies.watch();

    // set up a listener when change events are emitted
    changeStream.on('change', next => {
      // process any change event
      console.log('received a change to the collection: \t', next);
    });

    await simulateAsyncPause();

    await changeStream.close(() => console.log('closed the change stream'));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
