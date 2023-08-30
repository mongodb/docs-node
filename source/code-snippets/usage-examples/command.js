/* Run a database command */

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "<connection string uri>";

const client = new MongoClient(uri);

async function run() {
  try {
    const db = client.db("sample_mflix");
    // find and print the storage statistics for the "sample_mflix" database using the 'dbStats' command
    const result = await db.command({
      dbStats: 1,
    });
    console.log(result);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);
