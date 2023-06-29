const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection
// string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";

const client = new MongoClient(uri);

async function run(){
    try {
        const database = client.db("<database>");
        const collection = database.collection("<collection>");
        // start-listIndexes-example
        const result = await collection.listIndexes().toArray();
        console.log("Existing indexes:\n");
        for(const doc in result){
            console.log(doc);
        }
        // end-listIndexes-example
    }
    finally{
        await client.close();
    }
} 


