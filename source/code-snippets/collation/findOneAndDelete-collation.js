// ignored first line
// start findOneAndDelete example without collation
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority&useUnifiedTopology=true";;

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("myproject");
    const collection = db.collection("numbers");

    const result = await collection.findOneAndDelete({ a: { $gt: "100" } });

    console.dir(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// end findOneAndDelete example without collation

// start findOneAndDelete example with collation
const uri =
  "mongodb+srv://sample-hostname:27017/?poolSize=20&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("myproject");
    const collection = db.collection("numbers");

    const result = await collection.findOneAndDelete(
      { a: { $gt: "100" } },
      { collation: { locale: "en", numericOrdering: true } },
    );

    console.dir(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// end findOneAndDelete example with collation