const { MongoClient } = require('mongodb');

async function cleanUp(client) {
  try {
    const customersColl = client.db('testdb').collection('customers');
    await customersColl.drop();
  } catch(e) {}
  try {
    const inventoryColl = client.db('testdb').collection('inventory');
    await inventoryColl.drop();
  } catch(e) {}
  try {
    const ordersCollection = client.db('testdb').collection('orders')
    await ordersCollection.drop();
  } catch(e) {}
}

async function setup(client) {
  try {
    const customerColl = client.db('testdb').collection('customers');
    const inventoryColl = client.db('testdb').collection('inventory');

    await customerColl.insertOne({ _id: 98765, orders: [] });

    await inventoryColl.insertMany([
      { name: 'sunblock', sku: 5432, qty: 85 },
      { name: 'beach towel', sku: 7865, qty: 41 },
    ]);
  } catch (e) {
    console.log('Unable to insert test data: ' + e);
  }
}

async function queryData(client) {
  const customerColl = client.db('testdb').collection('customers');
  const customers = await customerColl.find().toArray();
  console.log(JSON.stringify(customers));

  const inventoryColl = client.db('testdb').collection('inventory');
  const inventory= await inventoryColl.find().toArray();
  console.log(JSON.stringify(inventory));
}


// start callback
async function placeOrder(client, session, cart, payment) {
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
    const checkInventory = await inventoryCollection.findOne(
      {
        sku: item.sku,
        qty: { $gte: item.qty }
      },
      { session }
    );

    if (checkInventory === null) {
      await session.abortTransaction();
      console.error('Insufficient quantity or SKU not found.');
    }

    await inventoryCollection.updateOne(
      { sku: item.sku },
      { $inc: { 'qty': -item.qty }},
      { session }
    );
  }

  const customerCollection = client.db('testdb').collection('customers');
  await customerCollection.updateOne(
    { _id: payment.customer },
    { $push:  { orders: orderResult.insertedId }},
    { session }
  );
}
// end callback

const uri = process.env.MONGDODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  await client.connect();
  await cleanUp(client);
  await setup(client);

  // start session
  const cart = [
    { name: 'sunblock', sku: 5432, qty: 1, price: 5.19 },
    { name: 'beach towel', sku: 7865, qty: 2, price: 15.99 }
  ];
  const payment = { customer: 98765, total: 37.17 };
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      placeOrder(client, session, cart, payment)
    }, transactionOptions);
  } catch(error) {
    console.log('Encountered an error during the transaction: ' + error);
  } finally {
    await session.endSession();
    await client.close();
  }
  // end session

  await queryData(client);
}
run().catch(console.dir);
