import { MongoError, MongoClient, ObjectId } from "mongodb";

const uri =
  "<connection string uri>";
const client = new MongoClient(uri);
await client.connect();

await client
  .db("testdb")
  .collection("inventory")
  .insertMany([
    // start-inventory
    { item: "sunblock", qty: 85, price: 6.0 },
    { item: "beach chair", qty: 30, price: 25.0 }
    // end-inventory
  ]);

const order1 = [
// start-order-successful
  { item: "sunblock", qty: 3 },
  { item: "beach chair", qty: 1 }
// end-order-successful
];

const order2 = [
// start-order-fail
  { item: "volleyball", qty: 1 }
// end-order-fail
];

let order = order1;

// start-transaction
const txnResult = await client.withSession(async (session) =>
  session
    .withTransaction(async (session) => {
      const invColl = client.db("testdb").collection("inventory");
      const recColl = client.db("testdb").collection("records");

      let total = 0;
      for (const item of order) {
        // End the transaction if the item
        // does not exist or has insufficient inventory
        const isInStock = await invColl.findOne(
          {
            item: item.item,
            qty: { $gte: item.qty },
          },
          { session }
        );
        if (isInStock === null) {
          await session.abortTransaction();
          return "Item not found or insufficient quantity.";
        }

        // If inventory is sufficient, update inventory
        // to account for the purchase.
        await invColl.updateOne(
          { item: item.item },
          { $inc: { qty: -item.qty } },
          { session }
        );
        const subTotal = item.qty * isInStock.price;
        total = total + subTotal;
      }

      // Create a record of the purchase.
      const receipt = {
        date: new Date(),
        items: order,
        total: total,
      };
      await recColl.insertOne(receipt, { session });
      return (
        "Order successfully completed and recorded!\nHere is the receipt:\n" +
        JSON.stringify(receipt, null, 1)
      );
    }, null)
    .finally(async () => await client.close())
);

console.log(txnResult);
// end-transaction