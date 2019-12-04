
const MongoClient = require("mongodb").MongoClient
const fs = require("fs")

;(async() => {
  try {
    // Replace the following with your MongoDB deployment's connection 
    // string.
    const host = 'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority'
    const client = await MongoClient.connect(
      host,
      { useNewUrlParser: true,
        useUnifiedTopology: true 
      },
    )
    const mflix = client.db("sample_mflix")
    
    // Replace with the path to your copy of the users.json file
    var users = JSON.parse(fs.readFileSync("<path/to/users.json/file"))

    var usersToInsert = []

    // Loop through each user in the users array and format the data from
    // the JSON file to be a series of insertOne operations. Append
    // each appropriately formatted object to the usersToInsert array.
    users.forEach(user => {
      usersToInsert.push({"insertOne": {"document": user}})
    })

    // Perform the bulk write operation and print out the resulting
    // BulkWriteResult object. This is a routine data import
    // that does not rely on the ordering of the operations to ensure
    // data consistency, so you can set the ordered option to false
    // to improve write performance.
    var result = await mflix.collection("users").bulkWrite
    (usersToInsert, { ordered: false })
    console.log(result)

    // Close the connection to the database and exit the process.
    client.close()
    process.exit(0)
  } catch (e) {

    // Report any errors that come up during the operation and exit the
    // process.
    console.error("\x1b[32m", `Error during bulkWrite, ${e}`)
    process.exit(1)
  }
})()