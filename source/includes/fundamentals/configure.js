const { MongoClient, ReadConcern, ReadPreference, WriteConcern } = require('mongodb');

// start-client-settings
const clientOptions = {
  readPreference: ReadPreference.SECONDARY,
  readConcern: new ReadConcern('local'),
  writeConcern: new WriteConcern('2')
};

const client = new MongoClient('mongodb://localhost:27017', clientOptions);
// end-client-settings

async function main() {
  await client.connect();

  // start-client-settings-uri
  const uri = 'mongodb://localhost:27017/?readPreference=secondary&readConcernLevel=local&w=2';
  const clientWithUri = new MongoClient(uri);
  
  await clientWithUri.connect();
  // end-client-settings-uri

  // start-session-settings
  const sessionOptions = {
    readPreference: new ReadPreference(ReadPreference.PRIMARY_PREFERRED),
    readConcern: new ReadConcern(ReadConcern.LOCAL),
    writeConcern: new WriteConcern(WriteConcern.MAJORITY)
  };

  const session = client.startSession(sessionOptions);
  // end-session-settings

  // start-transaction-settings
  const transactionOptions = {
    readPreference: new ReadPreference(ReadPreference.PRIMARY),
    readConcern: new ReadConcern(ReadConcern.MAJORITY),
    writeConcern: new WriteConcern(1)
  };

  session.startTransaction(transactionOptions);
  // end-transaction-settings

  // Sets read and write settings for the "test_database" database
  // start-database-settings
  const db = client.db('test_database', {
    readPreference: new ReadPreference(ReadPreference.PRIMARY_PREFERRED),
    readConcern: new ReadConcern(ReadConcern.AVAILABLE),
    writeConcern: new WriteConcern(WriteConcern.MAJORITY)
  });
  // end-database-settings

  // Sets read and write settings for the "test_collection" collection
  // start-collection-settings
  const collection = db.collection('test_collection', {
    readPreference: new ReadPreference(ReadPreference.SECONDARY_PREFERRED),
    readConcern: new ReadConcern(ReadConcern.AVAILABLE),
    writeConcern: new WriteConcern(0)
  });
  // end-collection-settings

  // Instructs the library to prefer reads from secondary replica set members
  // located in New York, followed by a secondary in San Francisco, and
  // lastly fall back to any secondary.
  // start-tag-set
  const taggedReadPreference = new ReadPreference(
    ReadPreference.SECONDARY,
    [
      { dc: 'ny' },
      { dc: 'sf' },
      {}
    ]
  );

  const dbWithTags = client.db(
    'test_database',
    { readPreference: taggedReadPreference }
  );
  // end-tag-set

  // Instructs the library to distribute reads between members within 35 milliseconds
  // of the closest member's ping time
  // start-local-threshold
  const clientWithLocalThreshold = new MongoClient('mongodb://localhost:27017', {
    replicaSet: 'repl0',
    readPreference: new ReadPreference(ReadPreference.SECONDARY_PREFERRED),
    localThresholdMS: 35
  });
  // end-local-threshold

  // Create the "souvenirs" collection and specify the French Canadian collation
  // start-collection-collation
  const db = client.db("db")
  db.createCollection("names", {
    collation: { locale: "fr_CA" },
  });
  // end-collection-collation

  // Create an index collation on the "souvenirs" collection
  // start-index-collation
  const coll = db.collection("names");
  coll.createIndex(
    { "last_name" : 1 },
    { "collation" : { "locale" : "en_US" } });
  // end-index-collation

  // Apply a collation to an operation
  // start-operation-collation
  coll.findOneAndUpdate(
    { first_name: { $lt: "Gunter" } },
    { $set: { verified: true } },
    { collation: { locale: "de@collation=phonebook" } },
  );
  // end-operation-collation
}

main().catch(console.error);