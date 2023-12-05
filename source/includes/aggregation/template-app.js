const { MongoClient } = require("mongodb");

// Replace the placeholder with your connection string.
const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const aggDB = client.db("agg_tutorials_db");

    /* 
       Get a reference to relevant collections.
       If the tutorial uses only one collection, delete or comment out
       any lines that reference collection 2
    */
    const collName1 = await aggDB.collection("<collection 1>");
    const collName2 = await aggDB.collection("<if used, collection 2>");

    // Delete any existing documents in collections.
    await collName1.deleteMany({});
    await collName2.deleteMany({});

    const sampleData1 = [
      // Paste sample data for collection 1 here.
    ];

    const sampleData2 = [
      // Paste sample data for collection 2 here.
    ];

    // Insert sample data into collections.
    await collName1.insertMany(sampleData1);
    await collName2.insertMany(sampleData2);

    // Create an empty pipeline array.
    const pipeline = [];

    // PASTE PIPELINE STAGE CODE HERE.
    // ... pipeline.push({ ... })

    // Run the aggregation.
    const aggregationResult = await collName1.aggregate(pipeline);

    // Print the aggregation results.
    for await (const document of aggregationResult) {
      console.log(document);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
