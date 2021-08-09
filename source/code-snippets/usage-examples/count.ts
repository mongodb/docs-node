import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    const estimate = await movies.estimatedDocumentCount();
    console.log(
      `Estimated number of documents in the movies collection: ${estimate}`
    );

    const countCanada = await movies.countDocuments({ countries: "Canada" });
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
