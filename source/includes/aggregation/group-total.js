const { MongoClient } = require("mongodb");

const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const aggDB = client.db("agg_tutorials_db");

    // start-coll
    const collName1 = await aggDB.collection("orders");
    // end-coll

    const sampleData1 = [
      // start-orders
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: new Date("2020-05-30T08:35:52Z"),
        value: 231.43,
      },
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: new Date("2020-01-13T09:32:07Z"),
        value: 99.99,
      },
      {
        customer_id: "oranieri@warmmail.com",
        orderdate: new Date("2020-01-01T08:25:37Z"),
        value: 63.13,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: new Date("2019-05-28T19:13:32Z"),
        value: 2.01,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: new Date("2020-11-23T22:56:53Z"),
        value: 187.99,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: new Date("2020-08-18T23:04:48Z"),
        value: 4.59,
      },
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: new Date("2020-12-26T08:55:46Z"),
        value: 48.5,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: new Date("2021-02-29T07:49:32Z"),
        value: 1024.89,
      },
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: new Date("2020-10-03T13:49:44Z"),
        value: 102.24,
      },
      // end-orders
    ];

    await collName1.deleteMany({});
    await collName1.insertMany(sampleData1);

    const pipeline = [];

    // start-match
    pipeline.push({
      $match: {
        orderdate: {
          $gte: new Date("2020-01-01T00:00:00Z"),
          $lt: new Date("2021-01-01T00:00:00Z"),
        },
      },
    });
    // end-match

    // start-sort1
    pipeline.push({
      $sort: {
        orderdate: 1,
      },
    });
    // end-sort1

    // start-group
    pipeline.push({
      $group: {
        _id: "$customer_id",
        first_purchase_date: { $first: "$orderdate" },
        total_value: { $sum: "$value" },
        total_orders: { $sum: 1 },
        orders: { $push: 
          { 
            orderdate: "$orderdate", 
            value: "$value" 
          }
        },
      },
    });
    // end-group

    // start-sort2
    pipeline.push({
      $sort: {
        first_purchase_date: 1,
      },
    });
    // end-sort2

    // start-set
    pipeline.push({
      $set: {
        customer_id: "$_id",
      },
    });
    // end-set

    // start-unset
    pipeline.push({ $unset: ["_id"] });
    // end-unset

    const aggregationResult = await collName1.aggregate(pipeline);
    for await (const document of aggregationResult) {
      console.log(document);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
