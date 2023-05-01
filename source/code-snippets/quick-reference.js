// ignored first line
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "<connection URI>";

const client = new MongoClient(uri);

async function query(coll) {
  console.log("findOne");
  const result = await coll.findOne({ title: 'Hamlet' });
  console.dir(result);
}

async function queryMany(coll) {
  console.log("find");
  const cursor = coll.find({ year: 2005 });
  for await (const doc of cursor) {
    console.dir(doc);
  }
}

async function insertOne(coll) {
  const result = await coll.insertOne({
    title: 'Jackie Robinson',
  });
  console.dir(result);
}
async function insertMany(coll) {
  const result = await coll.insertMany([
    { title: 'Dangal', rating: 'Not Rated' },
    { title: 'The Boss Baby', rating: 'PG' }
  ]);
  console.dir(result);
}

async function updateOne(coll) {
  const result = await coll.updateOne(
    { title: 'Amadeus' },
    { $set: { 'imdb.rating': 9.5 } }
  );
  console.dir(result);
}

async function updateMany(coll) {
  const result = await coll.updateMany(
    { year: 2001 },
    { $inc: { 'imdb.votes': 100 } }
  );

  console.dir(result);
}

async function updateArrayElement(coll) {
  const result = await coll.updateOne(
    { title: 'Cosmos' },
    { $push: { genres: 'Educational' } }
  );
  console.dir(result);

  const findResult = await coll.findOne({title: 'Cosmos'});
  console.dir(findResult);
}

async function replaceDocument(coll) {
  const result = await coll.replaceOne(
                { name: 'Deli Llama', address: '2 Nassau St' },
                { name: 'Lord of the Wings', zipcode: 10001 },
                { upsert: true}
             );
  console.dir(result);

  const findResult = await coll.findOne({name: 'Lord of the Wings'});
  console.dir(findResult);
}

async function deleteOne(coll) {
  const result = await coll.deleteOne({ title: 'Congo' });
  console.dir(result);
}

async function deleteMany(coll) {
  const result = await coll.deleteMany({ title: { $regex: /^Shark.*/ } });
  console.dir(result);
}

async function bulkWriteExample(coll) {
  const result = await coll.bulkWrite([
    {
      insertOne: {
        document: {
          title: 'A New Movie',
          year: 2022
        }
      }
    },
    {
      deleteMany: {
        filter: { year: { $lt: 1970 } }
      }
    }
  ]);
  console.dir(result);
}

async function watchStart(coll) {
  coll.watch([ { $match: { year: { $gte: 2022 } } } ]);
}

async function accessCursorIterative(coll) {
  const cursor = coll.find().limit(10);
  for await (const doc of cursor) {
    console.dir(doc);
  }
}

async function accessCursorArray(coll) {
  const cursor = coll.find().limit(10);
  const results = await cursor.toArray();
  console.log(results);
}

async function createIndex(coll) {
  const result = await coll.createIndex({'title':1 , 'year':-1});
  console.dir(result);
}

async function countExample(coll) {
  const result = await coll.countDocuments({year: 2000});
  console.dir(result);
}

async function skipExample(coll) {
  const cursor = coll.find({title: {$regex: /^Rocky/ }}, { skip: 2 });
  console.dir(await cursor.toArray());
}

async function sortExample(coll) {
  const cursor = coll.find().limit(50).sort({ year: 1});
  for await (const doc of cursor) {
    console.dir(doc);
  }
}

async function projectExample(coll) {
  const cursor = coll.find().project({ _id: 0, year: 1, imdb: 1 });
  for await (const doc of cursor) {
    console.dir(doc);
  }
}

async function searchText(coll) {
  const result = coll.find({$text: { $search: 'zissou' }}).limit(30).project({title: 1});
  for await (const doc of cursor) {
    console.dir(doc);
  }
}

async function distinct(coll) {
  const result = await coll.distinct('year');
  console.log(result);
}

async function run() {
  try {
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    //await count(collection);
    //await query(collection);
    //await queryMany(collection);
    //await insertOne(collection);
    //await insertMany(collection);
    //await updateOne(collection);
    //await updateMany(collection);
    //await updateArrayElement(collection);
    //await replaceDocument(collection);
    //await deleteOne(collection);
    //await deleteMany(collection);
    //await bulkWriteExample(collection);
    //await watchStart(collection);
    //await accessCursorIterative(collection);
    //await accessCursorArray(collection);
    //await countExample(collection);
    //await skipExample(collection);
    //await sortExample(collection);
    //await projectExample(collection);
    //await createIndex(collection);
    //await searchText(collection);
    //await distinct(collection);

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
