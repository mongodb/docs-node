import {
  ChangeStreamDocument,
  ChangeStreamEvents,
  TypedEventEmitter,
  MongoClient,
} from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run(): Promise<void> {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    // open a Change Stream on the "movies" collection
    let changeStream: TypedEventEmitter<ChangeStreamEvents> = movies.watch();

    const callback = (next: ChangeStreamDocument<Document>) => {
      // process any change event
      console.log("received a change to the collection: \t", next);
    };

    // set up a listener when change events are emitted
    changeStream.on<"change">("change", callback);

    // use a timeout to ensure the listener is registered before the insertOne
    // operation is called.
    await new Promise((resolve) => {
      setTimeout(async () => {
        await movies.insertOne({
          test: "sample movie document",
        });
        // wait to close `changeStream` after the listener receives the event
        setTimeout(async () => {
          changeStream.removeListener<"change">("change", callback);
          resolve(null);
        }, 1000);
      }, 1000);
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
