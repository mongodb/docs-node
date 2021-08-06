import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

interface Town {
  name: string;
  region: string;
}

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    // Specifying a Schema is optional, but it enables type hints on
    // finds and inserts
    const movies = database.collection<Town>("movies");
    const result = await movies.insertOne({ name: "Red", region: "Kanto" });
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
