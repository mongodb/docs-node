import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

type Minutes = number;

interface IMDB {
  rating: number;
  votes: number;
  id: number;
}

interface Movie {
  title: string;
  imdb: IMDB;
  runtime: Minutes;
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const movies = database.collection<Movie>("movies");

    const query = { runtime: { $lt: 15 } };
    const sort = { title: 1 };
    const projection = { _id: 0, title: 1, imdb: 1 };

    const cursor = movies.find<Movie>(query).sort(sort).project(projection);

    if ((await movies.countDocuments(query)) === 0) {
      console.warn("No documents found!");
    }

    for await (const doc of cursor) {
      console.dir(doc);
    } 
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
