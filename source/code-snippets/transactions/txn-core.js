const { MongoClient } = require("mongodb");

// drop collections
async function cleanUp(client) {
  try {
    const customersColl = client.db("testdb").collection("customers");
    await customersColl.drop();
  } catch(e) {}
  try {
    const inventoryColl = client.db("testdb").collection("inventory");
    await inventoryColl.drop();
  } catch(e) {}
  try {
    const ordersCollection = client.db('testdb').collection('orders')
    await ordersCollection.drop();
  } catch(e) {}
}

async function setup(client) {
  try {
    const customerColl = client.db("testdb").collection("customers");
    const inventoryColl = client.db("testdb").collection("inventory");

    await customerColl.insertOne({ _id: 98765, orders: [] });

    await inventoryColl.insertMany([
      { name: "sun screen", sku: 5432, qty: 85 },
      { name: "beach towel", sku: 7865, qty: 41 },
    ]);
  } catch (e) {
    console.log("Unable to insert test data: " + e);
  }
}

async function queryData(client) {
  const customerColl = client.db("testdb").collection("customers");
  const customers = await customerColl.find().toArray();
  console.log(JSON.stringify(customers));

  const inventoryColl = client.db("testdb").collection("inventory");
  const inventory= await inventoryColl.find().toArray();
  console.log(JSON.stringify(inventory));
}

// start transaction
async function placeOrder(client, session, cart, payment) {
  const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  };

  try {
    session.startTransaction(transactionOptions);

    const ordersCollection = client.db('testdb').collection('orders');
    const orderResult = await ordersCollection.insertOne(
      {
        customer: payment.customer,
        items: cart,
        total: 37.17,
      },
      { session }
    );

    const inventoryCollection = client.db('testdb').collection('inventory');

    for (var i=0; i<cart.length; i++) {

      const item = cart[i];

      // Cancel the transaction when you have insufficient inventory
      const checkInventory = inventoryCollection.findOne({
        sku: item.sku,
        qty: { $gte: item.qty }
      })
      if (checkInventory === null) {
        throw new Error('Insufficient quantity or SKU not found.');
      }

      await inventoryCollection.updateOne(
        { sku: item.sku },
        { $inc: { "qty": -item.qty }},
        { session }
      );
    }

    const customerCollection = client.db('testdb').collection('customers');
    await customerCollection.updateOne(
      { _id: payment.customer },
      { $push:  { orders: orderResult.insertedId }},
      { session }
    );
    await session.commitTransaction();
    console.log("Transaction successfully committed.");

  } catch (error) {

    if (error instanceof MongoError) {
      if (err.hasErrorLabel('UnknownTransactionCommitResult')) {
        // add your logic to retry or handle the error
      }
      else if (err.hasErrorLabel('TransientTransactionError')) {
        // add your logic to retry or handle the error
      }
    }

    console.log('An error occured in the transaction, performing a data rollback:' + error);
    await session.abortTransaction();
  }
}
// end transaction

const uri = process.env.MONGDODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  await client.connect();
  await cleanUp(client);
  await setup(client);

  // start session
  const cart = [
    { name: "sun screen", sku: 5432, qty: 1, price: 5.19 },
    { name: "beach towel", sku: 7865, qty: 2, price: 15.99 }
  ];
  const payment = { customer: 98765, total: 37.17 };

  const session = client.startSession();
  await placeOrder(client, session, cart, payment);
  session.endSession();
  // end session

  await queryData(client);
}
run().catch(console.dir).finally(() => client.close());

