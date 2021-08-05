import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

interface IMDB {
  rating: number;
  votes: number;
  id: number;
}

export interface Movie {
  title: string;
  year: number;
  released: Date;
  plot: string;
  type: 'movie' | 'series';
  imdb: IMDB;
}

async function run(): Promise<void> {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    // Specifying a Schema is always optional, but it enables type hinting on finds and inserts
    const movies = database.collection<MovieSchema>("movies");
    const query = { title: "The Room" };

    const options: FindOptions = {
      sort: { rating: -1 },
      projection: { _id: 0, title: 1, imdb: 1 },
    };

    const movie = await movies.findOne({ title: "The Room" }, {
      sort: { rating: -1 },
      projection: { _id: 0, title: 1, imdb: 1 },
    });
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
  
