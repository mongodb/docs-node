// ignored first line
const client = new MongoClient(uri);

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority&useUnifiedTopology=true";


async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("myproject");
    const collection = db.collection("contacts");

    const cursor = collection
      .find({ city: "New York" }, { collation: { locale: "de" } })
      .sort({ name: 1 });

    // print results
    await cursor.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
~