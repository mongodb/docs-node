const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function printData() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("radioCallers");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function runFirstArrayElement() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("radioCallers");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start firstArrayElement example
    const query = { date: "5/15/2023", "callers.phoneNumber": { $exists: true } };
    const updateDocument = {
      $set: { "callers.$.contestWinner": true }
    };
    const result = await myColl.updateOne(query, updateDocument);
    // end firstArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await myColl.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function runAllArrayElements() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("radioCallers");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start allArrayElement example
    const query = { date: "5/15/2023" };
    const updateDocument = {
      $unset: { "callers.$[].duration": "" }
    };
    const result = await myColl.updateOne(query, updateDocument);
    // end allArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await myColl.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function arrayFiltersIdentifier() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("radioCallers");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start arrayFiltersIdentifier example
    const query = { date: "5/15/2023" };
    const updateDocument = {
      $inc: {
        "callers.$[c].contestEntries": 1,
      },
    };
    const options = {
      arrayFilters: [
        {
          "c.state": { $in: ["New Jersey", "Texas"] },
          "c.phoneNumber": { $exists: true },
        },
      ],
    };
    const result = await myColl.updateOne(query, updateDocument, options);
    // end arrayFiltersIdentifier example
    console.log(result.modifiedCount);

    console.log(JSON.stringify(await (await myColl.find()).toArray()));
  } finally {
    await client.close();
  }
}
//run().catch(console.dir);
