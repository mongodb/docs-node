const { MongoClient } = require("mongodb");
const assert = require('assert');

// Connection URI
const uri =
  "mongodb+srv://sample-hostname:27017/?poolSize=20&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const results = collection.aggregate( 
      [ 
        { '$group': { '_id': "$directors", 'nameCount': { '$sum': 1 } } },
        { '$sort' : { '_id' : 1 } }
      ], { collation : { locale : 'de@collation=phonebook' } },
    );

    // TODO: print results
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);