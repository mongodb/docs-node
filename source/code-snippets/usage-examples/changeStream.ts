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

    // Specifying a type is optional, but it enables type hints
    let changeStream: TypedEventEmitter<ChangeStreamEvents> = movies.watch();

    const callback = (next: ChangeStreamDocument<Document>) => {
      console.log("received a change to the collection: \t", next);
    };

    changeStream.on<"change">("change", callback);

    await new Promise((resolve) => {
      setTimeout(async () => {
        await movies.insertOne({
          test: "sample movie document",
        });
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
