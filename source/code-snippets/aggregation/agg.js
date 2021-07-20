const { MongoClient, ExplainVerbosity } = require('mongodb');
const uri = 'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // begin data insertion
        const db = client.db("aggregation");
        const coll = db.collection("restaurants");

        const docs = [
            { "name": "Rising Sun Bakery", "stars": 3, "categories": ["Bakery", "Cafe", "Italian"] },
            { "name": "Cafe au Late", "stars": 4, "categories": ["Bakery", "Cafe", "Coffee", "Dessert"] },
            { "name": "Liz's Coffee Bar", "stars": 5, "categories": ["Coffee", "Cafe", "Bakery"] },
            { "name": "Oak Steakhouse", "stars": 3, "categories": ["Steak", "Seafood"] },
            { "name": "Petit Cookie", "stars": 4, "categories": ["Bakery", "Cookies", "Cake", "Coffee"] },
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
