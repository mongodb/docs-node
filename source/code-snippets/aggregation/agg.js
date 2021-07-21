const { MongoClient } = require('mongodb');
const uri = process.env.DRIVER_REF_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // begin data insertion
        const db = client.db("aggregation");
        const coll = db.collection("restaurants");

        const docs = [
            { "stars": 3, "categories": ["Bakery", "Sandwiches"], "name": "Rising Sun Bakery" },
            { "stars": 4, "categories": ["Bakery", "Cafe", "Bar"], "name": "Cafe au Late" },
            { "stars": 5, "categories": ["Coffee", "Bakery"], "name": "Liz's Coffee Bar" },
            { "stars": 3, "categories": ["Steak", "Seafood"], "name": "Oak Steakhouse" },
            { "stars": 4, "categories": ["Bakery", "Dessert"], "name": "Petit Cookie" },
        ];

        const result = await coll.insertMany(docs);
        // end data insertion

        // begin aggregation
        const pipeline = [
            {
                '$match': {
                    'categories': 'Bakery'
                }
            }, {
                '$group': {
                    '_id': '$stars',
                    'count': {
                        '$sum': 1
                    }
                }
            }
        ];

        const aggCursor = coll.aggregate(pipeline);
        await aggCursor.forEach(doc => console.log(doc));
        // end aggregation

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
