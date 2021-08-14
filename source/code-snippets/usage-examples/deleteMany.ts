import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

interface Movies {
  title: string;
}

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection<Movies>("movies");
    const result = await movies.deleteMany(
      // all movies with a title containing the string "Santa"
      { title: { $regex: ".*Santa.*" } }
    );
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
