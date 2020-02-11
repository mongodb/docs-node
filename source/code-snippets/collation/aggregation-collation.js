// ignored first line
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

    const db = client.db("myproject");
    const collection = db.collection("names");

    const cursor = collection.aggregate(
      [
        { $group: { "_id": "$first_name", "nameCount": { "$sum": 1 } } },
        { $sort: { "_id": 1 } },
      ],
      { collation: { locale: "de@collation=phonebook" } },
    );

    console.log(await cursor.toArray());
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
