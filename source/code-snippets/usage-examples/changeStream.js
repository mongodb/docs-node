const { MongoClient } = require("mongodb");
// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://admin:admin@mflix-2sp0m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
let changeStream, interval;
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
    let actions = 0;
    interval = setInterval(async () => {
      if (actions === 0) {
        actions++;
        console.log("inserting");
        return await collection.insertOne({ test: "change stream" });
      }
      if (actions === 1) {
        console.log("deleting");
        return await collection.deleteOne({ test: "change stream" });
      }
    }, 1000);
  } finally {
    setTimeout(async () => {
      clearInterval(interval);
      await changeStream.close();
      await client.close();
    }, 2500);
  }
}
run().catch(console.dir);
