const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function printData() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function runFirstArrayElement() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start firstArrayElement example
    const query = { name: "Sandy Kane", "appointments.stylist": "Janna" };
    const updateDocument = {
      $push: { "appointments.$.services": "shampoo" }
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
    const myColl = myDB.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start allArrayElement example
    const query = { clientName: "Dennis Roberts" };
    const updateDocument = {
      $inc: { "appointments.$[].cost": -15 }
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
    const myColl = myDB.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start arrayFiltersIdentifier example
    const query = { name: "Sandy Kane" };
    const updateDocument = {
      $set: {
        "appointments.$[appt].paymentPlan": {
          planType: "monthly installments"
        }
      }
    };
    const options = {
      arrayFilters: [{ "appt.cost": { $gte: 100 } }, { "appt.stylist": "Janna" } ],
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
