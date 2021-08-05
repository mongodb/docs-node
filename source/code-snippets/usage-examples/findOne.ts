import { FindOptions, MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

type imdb = {
  rating: number;
  votes: number;
  id: number;
};

interface MovieSchema extends Document {
  title: string;
  imdb: imdb;
}

async function run(): Promise<void> {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const movies = database.collection<MovieSchema>("movies");
    const query: object = { title: "The Room" };

    const options: FindOptions = {
      sort: { rating: -1 },
      projection: { _id: 0, title: 1, imdb: 1 },
    };

    const movie = await movies.findOne(query, options);
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
  
