const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);


async function loadData() {
  try {
    const database = client.db("test");
    const myColl = database.collection("salonClients");

    await myColl.drop();

    await myColl.insertMany([
      {
        "name": "Sandy Kane",
        "appointments": [
          {
            "date": "4/7/2017 3:00 PM",
            "services": [ "haircut", "styling", "color" ],
            "cost": 275,
            "stylist": "Francine"
          },
          {
            "date": "8/7/2017 3:00 PM",
            "services": [ "haircut", "styling" ],
            "cost": 115,
            "stylist": "Janna"
          },
          {
            "date": "10/17/2017 3:00 PM",
            "services": [ "styling" ],
            "cost": 75,
            "stylist": "Janna"
          }
        ]
      },
      {
        "name": "Dennis Roberts",
        "appointments": [
          {
            "date": "6/19/2017 4:30 PM",
            "services": [ "haircut", "styling" ],
            "cost": 85,
            "stylist": "Colin"
          },
          {
            "date": "10/1/2017 5:00 PM",
            "services": [ "beard trim" ],
            "cost": 35,
            "stylist": "Janna"
          }
        ]
      }
    ]);

    console.log(JSON.stringify(await (await myColl.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function runFirstArrayElement() {

  try {
    const database = client.db("test");
    const myColl = database.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start firstArrayElement example
    const query = { "name": "Sandy Kane", "appointments.stylist": "Janna" };
    const updateDocument = {
      $push: { "appointments.$.services": "wash" }
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
    const database = client.db("test");
    const myColl = database.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start allArrayElement example
    const query = { "name": "Dennis Roberts" };
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
    const database = client.db("test");
    const myColl = database.collection("salonClients");

    console.log(JSON.stringify(await (await myColl.find()).toArray()));

    // start arrayFiltersIdentifier example
    const query = { name: "Sandy Kane" };
    const updateDocument = {
      $set: {
        "appointments.$[appt].paymentPlan": {
          payment1: 50,
          payment2: 50,
          payment3: "remaining balance",
        },
      },
    };
    const options = {
      arrayFilters: [{ "appt.cost": { $gte: 100 } }],
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
