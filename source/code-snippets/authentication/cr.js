// ignored first line
const { MongoClient } = require("mongodb");
const fs = require("fs");

// specify the placeholder values for your environment in the following lines
const username = encodeURIComponent("<username>");
const password = encodeURIComponent("<password>");
const clusterUrl = "<MongoDB cluster url>";


// Replace the following with your MongoDB deployment's connection
// string.
const uri = 
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}&tls=true&tlsCertificateKeyFile=${clientPEMFile}`;

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
