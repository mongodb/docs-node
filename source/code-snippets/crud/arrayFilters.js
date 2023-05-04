const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function loadData() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("salonClients");

    await myColl.drop();

    await myColl.insertMany([
      {
        clientName: "Sandy Kane",
        appointments: [
          { date: "May 12 5:00pm", services: ["haircut", "styling"], stylist: "Francine" },
          { date: "Jul 12 5:00pm", services: ["haircut", "color"], stylist: "Janna" },
          { date: "Sep 12 5:00pm", services: ["haircut"], stylist: "Janna" },
        ],
      },
      {
        name: "Dennis Roberts",
        appointments: [
          {
            date: "June 19 4:30 PM",
            services: ["haircut", "styling"],
            cost: 85,
            stylist: "Francine",
          },
          {
            date: "July 10 5:00 PM",
            services: ["beard trim"],
            cost: 35,
            stylist: "Colin",
          },
        ],
      },
    ]);

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
      $push: { "appointments.$.services": "shampoo" },
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
      $inc: { "appointments.$[].cost": -15 },
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
          payment1: 75,
          payment2: "remaining balance",
        },
      },
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
