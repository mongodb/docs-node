// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://admin:admin@mflix-2sp0m.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("theaters");

    /*const query = {
      "location.geo": {
        $near: {
          $geometry: { type: "Point", coordinates: [-73.9667, 40.78] },
          $maxDistance: 10000,
        },
      },
    };*/
    const query = {
      "location.geo": {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-72, 40],
                [-74, 41],
                [-72, 39],
                [-72, 40],
              ],
            ],
          },
        },
      },
    };

    // find documents based on our query, sort, and projection
    const cursor = collection.find(query);

    // print a message if no documents were found
    if ((await cursor.count()) == 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
