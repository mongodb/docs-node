import { MongoClient } from "mongodb";

// start-socks
// Replace the placeholder with your connection string
const uri = "<connection string uri>";

// Replace the placeholders with your SOCKS5 proxy server details
const socksOptions = {
  proxyHost: "<host>",
  proxyPort: 1080,
  proxyUsername: "<username>",
  proxyPassword: "<password>",
};

const client = new MongoClient(uri, socksOptions);
// end-socks

// Retrieve the first document from the "myDB.myColl" namespace in MongoDB and print it to the console
async function run() {
  try {
    const db = client.db("myDB");
    const myColl = db.collection("myColl");
    const doc = await myColl.findOne({});
    console.log(doc);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
