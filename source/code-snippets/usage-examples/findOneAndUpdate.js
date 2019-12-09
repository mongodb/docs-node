// ignored first line
const { MongoClient } = require('mongodb');

const client = new MongoClient(
  'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority',
);

async function run() {
  try {
    await client.connect();

    const database = client.db('sample_mflix');
    const collection = database.collection('movies');
    // create a query for a movie to update
    const query = { rated: 'TV-G' };

    const options = {};

    // only include the following fields in the returned document
    options.projection = {
      title: 1,
      year: 1,
      rated: 1,
    };
    options.sort = {
      year: 1, // sort by year ascending to update the document with the earliest year
    };
    options.upsert = true; // create a document if no documents match the filter
    options.returnNewDocument = true; // return the updated document, not the original document

    const result = await collection.findOneAndUpdate(
      query,
      {
        $set: {
          rated: 'TV-PG',
        },
      },
      options,
    );
    console.log('results: \t', result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);