
const { MongoClient } = require('mongodb');


const client = new MongoClient(
   'mongodb+srv://admin:admin@mflix-2sp0m.mongodb.net/test?retryWrites=true&w=majority',
);

async function run() {
   try {
      await client.connect();

      const database = client.db('sample_mflix');
      const collection = database.collection('movies');

      // query for movies that have a runtime less than 15 minutes
      const query = { title: "Black Sheep" };

      // initialize an empty options object
      const options = {
         // sort returned documents in ascending order by title (A->Z)
         sort: { title: 1 },
         // Include only the `title` and `imdb` fields in each returned document
         projection: { title : 1, _id: 0, imdb: 1, fullplot: 1}
      }

      // pass our query and constructed options
      const cursor = collection.find(query, options);

      // iterate with await so the session doesn't end while printing
      for await (const movie of cursor) {
         console.dir(movie);
      }
   } finally {
      await client.close();
   }
}
run().catch(console.dir);
