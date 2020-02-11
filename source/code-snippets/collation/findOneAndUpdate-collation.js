// ignored first line

// start findOneAndUpdate without collation
collection.findOneAndUpdate(
  { first_name : { $lt: "Gunter" } }, 
  { $set: { verified: true } }
);
// end findOneAndUpdate without collation

// start findOneAndUpdate with collation
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("contacts");
    const collection = db.collection("names");

    const result = await collection.findOneAndUpdate(
      { first_name: { $lt: "Gunter" } },
      { $set: { verified: true } },
      { collation: { locale: "de@collation=phonebook" } },
    );

    console.dir(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// end findOneAndUpdate with collation