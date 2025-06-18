// Perform an aggregation

const { MongoClient } = require("mongodb");

const uri = process.env.MONGDODB_URI;
const client = new MongoClient(uri);

async function run() {
    // begin data insertion
    const db = client.db("aggregation");
    const coll = db.collection("restaurants");

    // begin aggregation
    // Define an aggregation pipeline with a match stage and a group stage
    const pipeline = [
        { $match: { cuisine: "Bakery" } },
        { $group: { _id: "$borough", count: { $sum: 1 } } }
    ];

    // Execute the aggregation
    const aggCursor = coll.aggregate(pipeline);
    
    // Print the aggregated results
    for await (const doc of aggCursor) {
        console.log(doc);
    }
    // end aggregation
}
// Run the program and print thrown errors, then close the connection
run().catch(console.dir).finally(() => client.close());
