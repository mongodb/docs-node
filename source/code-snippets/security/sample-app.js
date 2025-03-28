const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
try {
    // start example code here

    // end example code here

    await client.connect();
        
    // Ping the server to verify that the connection is successful
    await client.db('admin').command({ ping: 1 });
    console.log("Connected successfully");

} finally {
    await client.close();
}
}
run().catch(console.dir);
