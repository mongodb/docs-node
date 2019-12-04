
const { MongoClient } = require('mongodb');


const client = new MongoClient(
   'mongodb+srv://admin:admin@mflix-2sp0m.mongodb.net/test?retryWrites=true&w=majority',
);

async function run() {
   try {
      await client.connect();

      const database = client.db('sample_mflix');
      const collection = database.collection('movies');

      // create a query document for a range match for a movie less than 15 minutes long
      const query = { runtime: { $lt : 15 } };

      // initialize an empty options object
      options = {}

      // sort our returned documents by ascending title
      const sort = { title: 1 };

      // returned documents should only contain title and the imdb object, no _id
      const projection = { title : 1, _id: 0, imdb: 1 }
      options.sort = sort;
      options.projection = projection;

      // pass our query and constructed options
      const cursor = await collection.find(query, options);

      // iterate with await so the session doesn't end while printing
      for await (const movie of cursor) {
         console.dir(movie);
      }
   } finally {
      await client.close();
   }
}
run().catch(console.dir);
