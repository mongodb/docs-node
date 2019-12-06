
const { MongoClient } = require('mongodb')


const client = new MongoClient(
   'mongodb+srv://admin:admin@mflix-2sp0m.mongodb.net/test?retryWrites=true&w=majority',
)

async function run() {
   try {
      await client.connect()

      const database = client.db('sample_mflix')
      const collection = database.collection('movies')

      // query for movies that have a runtime less than 15 minutes
      const query = { runtime: { $lt : 15 } }
      // sort returned documents in ascending order by title (A->Z)
      const sort = { title: 1 }
      // Include only the `title` and `fullplot` fields in each returned document
      const projection = { title : 1, _id: 0, fullplot: 1}

      // pass our query, sort, and projection
      const cursor = collection
         .find(query)
         .sort(sort)
         .project(projection)

      // iterate with await so the session doesn't end while printing
      for await (const movie of cursor) {
         console.dir(movie)
      }
   } finally {
      await client.close()
   }
}
run().catch(console.dir)
