// ignored first line
const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://admin:admin@mflix-2sp0m.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("hotdog");

    console.log(JSON.stringify(await (await collection.find()).toArray()));

    // start arrayFilters example
    const result = await collection.updateMany(
      { "finalists.name": "Steve Jobs" },
      { $set: { "finalists.$[exampleVariableName].name": "Steve Lobster" } },
      { arrayFilters: [{ "exampleVariableName.name": "Steve Jobs" }] },
    );
    // end arrayFilters example
    console.log(result.modifiedCount);

    console.log(JSON.stringify(await (await collection.find()).toArray()));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
