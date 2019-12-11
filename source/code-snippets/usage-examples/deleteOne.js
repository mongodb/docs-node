// ignored first line
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // Query for a movie that has a title of type string
    const query = { title: { $type: "string" } };

    const options = {
      // timeout after 30 seconds with no response
      wtimeout: 30000,
      // confirm write only after majority of replicas have acknowledged
      w: "majority",
    };

    collection.deleteOne(query, options, function(error, result) {
      if (error) {
        console.log("Error: " + error.errmsg);
      } else {
        if (result.deletedCount == 1) {
          console.dir("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query.");
        }
      }
    });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
