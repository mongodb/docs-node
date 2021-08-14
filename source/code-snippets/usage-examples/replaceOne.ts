import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

interface Movies {
  title: string;
  random_number?: number;
}

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    const result = await movies.replaceOne(
      { title: { $regex: "The Cat from" } },
      {
        title: "The Cat from Cleveland",
        random_number: Math.random(),
      }
    );
    console.log(`Modified ${result.modifiedCount} document`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
