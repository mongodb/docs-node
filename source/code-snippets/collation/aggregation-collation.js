const { MongoClient } = require("mongodb");
const assert = require('assert');

// Connection URI
const uri =
  "mongodb+srv://sample-hostname:27017/?poolSize=20&useUnifiedTopology=true";

// Create a new MongoClient
const client = new MongoClient(uri);
const dbName = "sample_mflix";

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db(dbName);
  
    countNames(db, function() {
        client.close();
      });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

function countNames(db, callback) {
  const collection = db.collection( 'names' );
  collection.aggregate( 
      [ 
        { '$group': { '_id': "$first_name", 'nameCount': { '$sum': 1 } } },
        { '$sort' : { '_id' : 1 } }
      ], { collation : { locale : 'de@collation=phonebook' } },

      function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
      }
  );
}